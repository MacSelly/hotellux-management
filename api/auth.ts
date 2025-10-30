import { apiClient } from './client';
import { User, ApiResponse } from './types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: 'guest';
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        '/auth/login',
        credentials
      );
      
      if (response.success && response.data) {
        apiClient.setToken(response.data.token);
        // Store tokens
        localStorage.setItem('hotel_token', response.data.token);
        localStorage.setItem('hotel_refresh_token', response.data.refreshToken);
      }
      
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          message: error.message || 'Login failed',
        },
      };
    }
  },

  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    try {
      return await apiClient.post<ApiResponse<User>>('/auth/register', data);
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'REGISTRATION_FAILED',
          message: error.message || 'Registration failed',
        },
      };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
      apiClient.clearToken();
      localStorage.removeItem('hotel_token');
      localStorage.removeItem('hotel_refresh_token');
      localStorage.removeItem('hotel_user');
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'LOGOUT_FAILED',
          message: error.message || 'Logout failed',
        },
      };
    }
  },

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    try {
      const refreshToken = localStorage.getItem('hotel_refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        '/auth/refresh',
        { refreshToken }
      );

      if (response.success && response.data) {
        apiClient.setToken(response.data.token);
        localStorage.setItem('hotel_token', response.data.token);
        localStorage.setItem('hotel_refresh_token', response.data.refreshToken);
      }

      return response;
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'REFRESH_FAILED',
          message: error.message || 'Token refresh failed',
        },
      };
    }
  },

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<ApiResponse<void>>('/auth/forgot-password', {
        email,
      });
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'FORGOT_PASSWORD_FAILED',
          message: error.message || 'Password reset request failed',
        },
      };
    }
  },

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<ApiResponse<void>>('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'RESET_PASSWORD_FAILED',
          message: error.message || 'Password reset failed',
        },
      };
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      return await apiClient.get<ApiResponse<User>>('/auth/me');
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'GET_USER_FAILED',
          message: error.message || 'Failed to get current user',
        },
      };
    }
  },
};
