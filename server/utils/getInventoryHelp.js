import { InventoryModel } from '../models/InventoryItemModel.js';

export const getLowStockItems = async () => {
    const allItems = await InventoryModel.find();
    const lowStockItems = allItems.filter(item => item.threshold >= item.quantity);
    console.log(lowStockItems);
    
    return { allItems, lowStockItems };
};
