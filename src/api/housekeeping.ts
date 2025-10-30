import { apiClient } from './client';
import { HousekeepingTask, InventoryItem, ApiResponse } from './types';

export interface UpdateTaskRequest {
  status: 'pending' | 'in-progress' | 'completed';
  notes?: string;
}

export interface RequestSuppliesRequest {
  items: Array<{
    itemId: string;
    quantity: number;
    urgency: 'normal' | 'urgent';
  }>;
  notes?: string;
}

export const housekeepingApi = {
  async getTasks(params?: {
    status?: string;
    assignee?: string;
    priority?: string;
  }): Promise<ApiResponse<HousekeepingTask[]>> {
    try {
      return await apiClient.get<ApiResponse<HousekeepingTask[]>>(
        '/housekeeping/tasks',
        params
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_TASKS_FAILED',
          message: error.message || 'Failed to fetch tasks',
        },
      };
    }
  },

  async updateTask(
    id: string,
    data: UpdateTaskRequest
  ): Promise<ApiResponse<HousekeepingTask>> {
    try {
      return await apiClient.put<ApiResponse<HousekeepingTask>>(
        `/housekeeping/tasks/${id}`,
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'UPDATE_TASK_FAILED',
          message: error.message || 'Failed to update task',
        },
      };
    }
  },

  async getInventory(): Promise<ApiResponse<InventoryItem[]>> {
    try {
      return await apiClient.get<ApiResponse<InventoryItem[]>>(
        '/housekeeping/inventory'
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_INVENTORY_FAILED',
          message: error.message || 'Failed to fetch inventory',
        },
      };
    }
  },

  async requestSupplies(
    data: RequestSuppliesRequest
  ): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<ApiResponse<void>>(
        '/housekeeping/inventory/request',
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'REQUEST_SUPPLIES_FAILED',
          message: error.message || 'Failed to request supplies',
        },
      };
    }
  },
};
