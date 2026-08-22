import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {createFreightLoad, findFreightLoad, markFreightLoadCompleted} from '../../actors/Freight/Freight';
import {recordBankLedgerEntry} from '../bank-ledger';
import {createPrismaGeoCoreKit} from '../geo-core/prisma-adapter';
import {fetchOsrm} from '../../lib/osrm-client';
import {readGeoDirectionCache, writeGeoDirectionCache} from '../../services/geo-direction-cache';

import {createPrismaFreightRoutingKit} from './prisma-adapter';

vi.mock('../../actors/Freight/Freight', () => ({
  createFreightLoad: vi.fn(),
  findFreightLoad: vi.fn(),
  loadFreightLoads: vi.fn(),
  markFreightLoadCompleted: vi.fn(),
}));
vi.mock('../bank-ledger', () => ({recordBankLedgerEntry: vi.fn()}));
vi.mock('../geo-core/prisma-adapter', () => ({
  createPrismaGeoCoreKit: vi.fn(),
}));
vi.mock('../../lib/osrm-client', () => ({fetchOsrm: vi.fn()}));
vi.mock('../../services/geo-direction-cache', () => ({
  readGeoDirectionCache: vi.fn(),
  writeGeoDirectionCache: vi.fn(),
}));

const load = {
  id: 'load-1',
  title: 'Produce run',
  originName: 'Farm',
  originLat: 1,
  originLng: 2,
  destinationName: 'Market',
  destinationLat: 3,
  destinationLng: 4,
  distanceKm: 10,
  durationMinutes: 10,
  cost: 20,
  status: 'planning',
  routeGeoJson: {type: 'LineString'},
  createdAt: new Date('2026-08-22T00:00:00.000Z'),
  updatedAt: new Date('2026-08-22T00:00:00.000Z'),
};

describe('Prisma Freight routing host adapter', () => {
  const geoCore = {resolveRoute: vi.fn()};
  const resolveGeoActorId = vi.fn().mockResolvedValue('geo-actor-1');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createPrismaGeoCoreKit).mockReturnValue(geoCore as any);
    resolveGeoActorId.mockResolvedValue('geo-actor-1');
    vi.mocked(readGeoDirectionCache).mockResolvedValue(null);
    vi.mocked(writeGeoDirectionCache).mockResolvedValue(undefined);
    vi.mocked(createFreightLoad).mockResolvedValue(load as any);
  });

  it('plans through the public Geo core Kit and keeps OSRM details internal',
     async () => {
       geoCore.resolveRoute.mockResolvedValue({
         distanceKm: 10,
         durationMinutes: 10,
         geojson: {type: 'LineString'},
         cached: false,
       });
       vi.mocked(fetchOsrm).mockResolvedValue({
         ok: true,
         status: 200,
         url: 'https://osrm.test/route',
         body: {routes: [{
           distance: 10_000,
           duration: 600,
           geometry: {type: 'LineString'},
           legs: [],
         }]},
       });
       const prisma = {} as any;
      const kit = createPrismaFreightRoutingKit(prisma, resolveGeoActorId);

       await kit.planLoad({
         userId: 'user-1',
         title: 'Produce run',
         originName: 'Farm',
         origin: {lat: 1, lng: 2},
         destinationName: 'Market',
         destination: {lat: 3, lng: 4},
         ratePerKm: 2,
       });

       expect(createPrismaGeoCoreKit).toHaveBeenCalledWith(prisma);
      expect(resolveGeoActorId).toHaveBeenCalledWith('user-1');
       expect(geoCore.resolveRoute).toHaveBeenCalledWith({
         actorId: 'geo-actor-1',
         origin: {lat: 1, lng: 2},
         destination: {lat: 3, lng: 4},
       });
       expect(fetchOsrm).toHaveBeenCalledWith(expect.objectContaining({
         service: 'route',
         profile: 'driving',
       }));
       expect(writeGeoDirectionCache).toHaveBeenCalledWith(
           prisma, 'geo-actor-1', expect.objectContaining({provider: 'osrm'}));
     });

  it('settles the Bank ledger and completes the load in one transaction',
     async () => {
       vi.mocked(findFreightLoad).mockResolvedValue(load as any);
       const completed = {...load, status: 'completed'};
       vi.mocked(markFreightLoadCompleted).mockResolvedValue(completed as any);
       vi.mocked(recordBankLedgerEntry).mockResolvedValue({
         id: 'entry-1',
         createdAt: '2026-08-22T00:00:00.000Z',
       });
       const transaction = {
         user: {
           findUnique: vi.fn().mockResolvedValue({
             k3h4CoinBalance: new Prisma.Decimal('500.00'),
           }),
           update: vi.fn().mockResolvedValue({
             k3h4CoinBalance: new Prisma.Decimal('480.00'),
           }),
         },
       };
       const prisma = {
         $transaction: vi.fn(async (callback) => callback(transaction)),
       } as any;
      const kit = createPrismaFreightRoutingKit(prisma, resolveGeoActorId);

       await expect(kit.completeLoad('user-1', 'load-1'))
           .resolves.toEqual(completed);

       expect(prisma.$transaction).toHaveBeenCalledOnce();
       expect(recordBankLedgerEntry).toHaveBeenCalledWith(
           transaction, expect.objectContaining({
             userId: 'user-1',
             amount: '20.00',
             balanceAfter: '480.00',
             kind: 'freight_payment',
             targetId: 'load-1',
           }));
       expect(markFreightLoadCompleted)
           .toHaveBeenCalledWith(transaction, 'load-1');
     });
});