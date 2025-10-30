import { apiClient } from './client';
import { Reservation, ApiResponse } from './types';

export interface CreateReservationRequest {
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  specialRequests?: string[];
  rateCode?: string;
}

export interface UpdateReservationRequest {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  status?: 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests?: string[];
}

export const reservationsApi = {
  async getReservations(params?: {
    status?: string;
    checkIn?: string;
    checkOut?: string;
    guestId?: string;
  }): Promise<ApiResponse<Reservation[]>> {
    try {
      return await apiClient.get<ApiResponse<Reservation[]>>(
        '/reservations',
        params
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_RESERVATIONS_FAILED',
          message: error.message || 'Failed to fetch reservations',
        },
      };
    }
  },

  async getReservation(id: string): Promise<ApiResponse<Reservation>> {
    try {
      return await apiClient.get<ApiResponse<Reservation>>(
        `/reservations/${id}`
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_RESERVATION_FAILED',
          message: error.message || 'Failed to fetch reservation',
        },
      };
    }
  },

  async createReservation(
    data: CreateReservationRequest
  ): Promise<ApiResponse<Reservation>> {
    try {
      return await apiClient.post<ApiResponse<Reservation>>(
        '/reservations',
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'CREATE_RESERVATION_FAILED',
          message: error.message || 'Failed to create reservation',
        },
      };
    }
  },

  async updateReservation(
    id: string,
    data: UpdateReservationRequest
  ): Promise<ApiResponse<Reservation>> {
    try {
      return await apiClient.put<ApiResponse<Reservation>>(
        `/reservations/${id}`,
        data
      );
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'UPDATE_RESERVATION_FAILED',
          message: error.message || 'Failed to update reservation',
        },
      };
    }
  },

  async cancelReservation(id: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.delete<ApiResponse<void>>(`/reservations/${id}`);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'CANCEL_RESERVATION_FAILED',
          message: error.message || 'Failed to cancel reservation',
        },
      };
    }
  },
};
