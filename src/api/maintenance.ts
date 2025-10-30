import { apiClient } from './client';
import { WorkOrder, ApiResponse } from './types';

export interface CreateWorkOrderRequest {
  roomNumber: string;
  issue: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'Furniture' | 'Other';
}

export interface UpdateWorkOrderRequest {
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee?: string;
  notes?: string;
  actualCost?: number;
}

export const maintenanceApi = {
  async getWorkOrders(params?: {
    priority?: string;
    status?: string;
    assignee?: string;
  }): Promise<ApiResponse<WorkOrder[]>> {
    try {
      return await apiClient.get<ApiResponse<WorkOrder[]>>(
        '/maintenance/work-orders',
        params
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_WORK_ORDERS_FAILED',
          message: error.message || 'Failed to fetch work orders',
        },
      };
    }
  },

  async createWorkOrder(
    data: CreateWorkOrderRequest
  ): Promise<ApiResponse<WorkOrder>> {
    try {
      return await apiClient.post<ApiResponse<WorkOrder>>(
        '/maintenance/work-orders',
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'CREATE_WORK_ORDER_FAILED',
          message: error.message || 'Failed to create work order',
        },
      };
    }
  },

  async updateWorkOrder(
    id: string,
    data: UpdateWorkOrderRequest
  ): Promise<ApiResponse<WorkOrder>> {
    try {
      return await apiClient.put<ApiResponse<WorkOrder>>(
        `/maintenance/work-orders/${id}`,
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'UPDATE_WORK_ORDER_FAILED',
          message: error.message || 'Failed to update work order',
        },
      };
    }
  },

  async getEquipment(): Promise<ApiResponse<any[]>> {
    try {
      return await apiClient.get<ApiResponse<any[]>>(
        '/maintenance/equipment'
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_EQUIPMENT_FAILED',
          message: error.message || 'Failed to fetch equipment',
        },
      };
    }
  },
};
