import { apiClient } from './client';
import { Room, ApiResponse, DashboardStats } from './types';

export interface UpdateRoomStatusRequest {
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  occupants?: number;
  guestName?: string;
  notes?: string;
}

export const roomsApi = {
  async getRooms(params?: {
    status?: string;
    floor?: number;
    type?: string;
  }): Promise<ApiResponse<Room[]>> {
    try {
      return await apiClient.get<ApiResponse<Room[]>>('/rooms', params);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_ROOMS_FAILED',
          message: error.message || 'Failed to fetch rooms',
        },
      };
    }
  },

  async getRoom(id: string): Promise<ApiResponse<Room>> {
    try {
      return await apiClient.get<ApiResponse<Room>>(`/rooms/${id}`);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_ROOM_FAILED',
          message: error.message || 'Failed to fetch room',
        },
      };
    }
  },

  async updateRoomStatus(
    id: string,
    data: UpdateRoomStatusRequest
  ): Promise<ApiResponse<Room>> {
    try {
      return await apiClient.put<ApiResponse<Room>>(`/rooms/${id}/status`, data);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'UPDATE_ROOM_FAILED',
          message: error.message || 'Failed to update room status',
        },
      };
    }
  },

  async getStatistics(): Promise<ApiResponse<DashboardStats>> {
    try {
      return await apiClient.get<ApiResponse<DashboardStats>>(
        '/rooms/statistics'
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_STATS_FAILED',
          message: error.message || 'Failed to fetch statistics',
        },
      };
    }
  },
};
