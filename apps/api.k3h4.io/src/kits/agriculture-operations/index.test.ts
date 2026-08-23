import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {AgricultureOperationsError, createAgricultureOperationsKit} from './index';

describe('Agriculture operations Kit', () => {
  const createHost = () => ({
    getOverview: vi.fn().mockResolvedValue({plots: 1}),
    getAnalytics: vi.fn().mockResolvedValue({totalPlots: 1}),
    listSlots: vi.fn().mockResolvedValue({slots: []}),
    unlockSlot: vi.fn().mockResolvedValue({id: 'slot-1'}),
    updateSlot: vi.fn().mockResolvedValue({id: 'slot-1'}),
    listPlots: vi.fn().mockResolvedValue({plots: []}),
    createPlot: vi.fn().mockResolvedValue({id: 'plot-1'}),
    recordPlotCondition: vi.fn().mockResolvedValue({id: 'condition-1'}),
    listPlans: vi.fn().mockResolvedValue({plans: []}),
    createPlan: vi.fn().mockResolvedValue({id: 'plan-1'}),
    listTasks: vi.fn().mockResolvedValue({tasks: []}),
    createTask: vi.fn().mockResolvedValue({id: 'task-1'}),
    updateTask: vi.fn().mockResolvedValue({id: 'task-1'}),
    listInventory: vi.fn().mockResolvedValue({inventory: []}),
    createInventoryItem: vi.fn().mockResolvedValue({id: 'inventory-1'}),
    recordInventoryMovement: vi.fn().mockResolvedValue({id: 'movement-1'}),
    createShipment: vi.fn().mockResolvedValue({id: 'shipment-1'}),
    listResources: vi.fn().mockResolvedValue({categories: []}),
  });

  const createKit = (host = createHost()) => ({
    host,
    kit: createAgricultureOperationsKit({
      host: host as any,
      freight: {listLoads: vi.fn().mockResolvedValue([])} as any,
    }),
  });

  it('exposes overview and analytics as one behavior group', async () => {
    const {host, kit} = createKit();

    await expect(kit.overview.getOverview('user-1')).resolves.toEqual({plots: 1});
    await expect(kit.overview.getAnalytics('user-1')).resolves.toEqual({totalPlots: 1});
    expect(host.getOverview).toHaveBeenCalledWith('user-1');
    expect(host.getAnalytics).toHaveBeenCalledWith('user-1');
  });

  it('exposes plots, slots, and conditions as one behavior group', async () => {
    const {host, kit} = createKit();

    await kit.plots.listSlots('user-1');
    await kit.plots.unlockSlot('user-1', {costPaid: 150});
    await kit.plots.updateSlot('user-1', 'slot-1', {plotId: 'plot-1'});
    await kit.plots.listPlots('user-1');
    await kit.plots.createPlot('user-1', {name: 'North', crop: 'Corn'});
    await kit.plots.recordCondition('user-1', 'plot-1', {moisture: 42});

    expect(host.listSlots).toHaveBeenCalledWith('user-1');
    expect(host.unlockSlot).toHaveBeenCalledWith('user-1', {costPaid: 150});
    expect(host.updateSlot).toHaveBeenCalledWith(
        'user-1', 'slot-1', {plotId: 'plot-1'});
    expect(host.listPlots).toHaveBeenCalledWith('user-1');
    expect(host.createPlot).toHaveBeenCalledWith(
        'user-1', {name: 'North', crop: 'Corn'});
    expect(host.recordPlotCondition).toHaveBeenCalledWith(
        'user-1', 'plot-1', {moisture: 42});
  });

  it('exposes plans, tasks, and status as one behavior group', async () => {
    const {host, kit} = createKit();

    await kit.plans.listPlans('user-1');
    await kit.plans.createPlan('user-1', {plotId: 'plot-1'});
    await kit.plans.listTasks('user-1', 'active');
    await kit.plans.createTask('user-1', {title: 'Water'});
    await kit.plans.updateTask('user-1', 'task-1', {status: 'completed'});

    expect(host.listPlans).toHaveBeenCalledWith('user-1');
    expect(host.createPlan).toHaveBeenCalledWith('user-1', {plotId: 'plot-1'});
    expect(host.listTasks).toHaveBeenCalledWith('user-1', 'active');
    expect(host.createTask).toHaveBeenCalledWith('user-1', {title: 'Water'});
    expect(host.updateTask).toHaveBeenCalledWith(
        'user-1', 'task-1', {status: 'completed'});
  });

  it('exposes inventory and movements as one behavior group', async () => {
    const {host, kit} = createKit();

    await kit.inventory.list('user-1');
    await kit.inventory.createItem('user-1', {sku: 'seeds', unit: 'bag'});
    await kit.inventory.recordMovement(
        'user-1', {inventoryId: 'inventory-1', quantity: 2});

    expect(host.listInventory).toHaveBeenCalledWith('user-1');
    expect(host.createInventoryItem).toHaveBeenCalledWith(
        'user-1', {sku: 'seeds', unit: 'bag'});
    expect(host.recordInventoryMovement).toHaveBeenCalledWith(
        'user-1', {inventoryId: 'inventory-1', quantity: 2});
  });

  it('exposes the resource library as one behavior group', async () => {
    const {host, kit} = createKit();

    await expect(kit.resources.list()).resolves.toEqual({categories: []});
    expect(host.listResources).toHaveBeenCalledOnce();
  });

  it('creates a shipment when its freight load is visible to the user', async () => {
    const host = createHost();
    const freight = {
      listLoads: vi.fn().mockResolvedValue([{id: 'load-1'}]),
    };
    const kit = createAgricultureOperationsKit({
      host: host as any,
      freight: freight as any,
    });

    await expect(kit.shipments.create('user-1', {
      lot: 'LOT-1',
      destination: 'Market',
      mode: 'truck',
      freightLoadId: ' load-1 ',
    })).resolves.toEqual({id: 'shipment-1'});
    expect(freight.listLoads).toHaveBeenCalledWith('user-1');
    expect(host.createShipment).toHaveBeenCalledWith(
        'user-1', expect.objectContaining({freightLoadId: 'load-1'}));
  });

  it('rejects a shipment whose freight load is not visible to the user', async () => {
    const host = createHost();
    const freight = {
      listLoads: vi.fn().mockResolvedValue([{id: 'another-load'}]),
    };
    const kit = createAgricultureOperationsKit({
      host: host as any,
      freight: freight as any,
    });

    await expect(kit.shipments.create('user-1', {
      lot: 'LOT-1',
      destination: 'Market',
      mode: 'truck',
      freightLoadId: 'missing-load',
    })).rejects.toEqual(expect.objectContaining({
      code: 'FREIGHT_LOAD_NOT_FOUND',
      message: 'Freight load not found',
    }));
    expect(freight.listLoads).toHaveBeenCalledWith('user-1');
    expect(host.createShipment).not.toHaveBeenCalled();
    expect(AgricultureOperationsError).toBeDefined();
  });
});
