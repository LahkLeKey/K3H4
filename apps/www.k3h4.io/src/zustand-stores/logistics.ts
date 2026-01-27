import {create} from 'zustand';

export type LogisticsTab = 'freight'|'warehouse'|'agriculture'|'usda';

export type LogisticsFieldKey =|'freightTitle'|'freightRate'|'warehouseSku'|
    'warehouseQty'|'freightCustomTitle'|'freightCustomRate'|
    'freightActionStatus'|'warehouseLocation'|'warehouseCreateStatus'|
    'warehouseCategory'|'warehouseDescription'|'warehouseMetadata'|
    'warehouseSlotId'|'agricultureSlotId'|'agricultureInvName'|
    'agricultureInvQty'|'agricultureFormStatus'|'status';

export type LogisticsState = {
  activeTab: LogisticsTab; freightTitle: string; freightRate: string;
  warehouseSku: string;
  warehouseQty: string;
  freightCustomTitle: string;
  freightCustomRate: string;
  freightActionStatus: string;
  warehouseLocation: string;
  warehouseCreateStatus: string;
  warehouseCategory: 'agriculture' | 'other';
  warehouseDescription: string;
  warehouseMetadata: string;
  warehouseSlotId: string;
  agricultureSlotId: string;
  agricultureInvName: string;
  agricultureInvQty: string;
  agricultureFormStatus: string;
  status: string;
  usdaDetail:
      {title: string; code?: string; wikidataId?: string; enrichment: any} |
      null;
  setActiveTab: (tab: LogisticsTab) => void;
  updateField: (key: LogisticsFieldKey, value: string) => void;
  setStatus: (message: string) => void;
  resetStatus: () => void;
  setUsdaDetail:
      (detail:
           {title: string; code?: string; wikidataId?: string; enrichment: any}|
       null) => void;
  reset: () => void;
};

type LogisticsValueState = Omit<
    LogisticsState,
    |'setActiveTab'|'updateField'|'setStatus'|'resetStatus'|'setUsdaDetail'|
    'reset'>;

const defaultState: LogisticsValueState = {
  activeTab: 'warehouse',
  freightTitle: 'Austin -> Dallas',
  freightRate: '2.1',
  warehouseSku: 'SKU-123',
  warehouseQty: '10',
  freightCustomTitle: 'Austin -> Dallas',
  freightCustomRate: '2.1',
  freightActionStatus: '',
  warehouseLocation: 'A1',
  warehouseCreateStatus: '',
  warehouseCategory: 'agriculture',
  warehouseDescription: '',
  warehouseMetadata: '',
  warehouseSlotId: '',
  agricultureSlotId: 'slot-1',
  agricultureInvName: 'Seeds',
  agricultureInvQty: '5',
  agricultureFormStatus: '',
  status: '',
  usdaDetail: null,
};

export const useLogisticsStore = create<LogisticsState>(
    (set) => ({
      ...defaultState,
      setActiveTab: (tab) => set({activeTab: tab}),
      updateField: (key, value) =>
          set({[key]: value} as unknown as Partial<LogisticsState>),
      setStatus: (message) => set({status: message}),
      resetStatus: () => set({status: ''}),
      setUsdaDetail: (detail) => set({usdaDetail: detail}),
      reset: () => set(() => ({...defaultState})),
    }));
