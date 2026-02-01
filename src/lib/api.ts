const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId?: string;
  [key: string]: unknown;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown[];
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token') || this.getCookie('token');
    }
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
        // Also set in cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      } else {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; max-age=0';
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return {
        success: true,
        data: data.user || data.tenant || data.users || data.tenants || data.stats || data.subscription || data.plans || data,
        ...data,
      };
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      return {
        success: false,
        message: error.message || 'Network error',
      };
    }
  }

  // Auth
  async register(data: {
    email: string;
    password: string;
    name: string;
    organizationName: string;
    organizationSlug?: string;
  }) {
    return this.request<{ user: User; tenant: Tenant; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    const response = await this.request<{ user: User; tenant: Tenant; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // Tenants
  async getTenant(slug: string) {
    return this.request<{ tenant: Tenant }>(`/tenants/${slug}`);
  }

  async updateTenant(slug: string, data: { name?: string }) {
    return this.request<{ tenant: Tenant }>(`/tenants/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTenantBySlug(slug: string) {
    return this.request(`/tenants/${slug}`, {
      method: 'DELETE',
    });
  }

  // Users
  async getUsers() {
    return this.request<{ users: User[] }>('/users');
  }

  async getUser(id: string) {
    return this.request<{ user: User }>(`/users/${id}`);
  }

  async inviteUser(data: { email: string; name: string; role: string }) {
    return this.request<{ user: User }>('/users/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUserRole(id: string, role: string) {
    return this.request<{ user: User }>(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(id: string) {
    return this.request('/users/' + id, {
      method: 'DELETE',
    });
  }

  // Subscriptions
  async getPlans() {
    return this.request<{ plans: unknown[] }>('/subscriptions/plans');
  }

  async getCurrentSubscription() {
    return this.request<{ subscription: unknown }>('/subscriptions/current');
  }

  async createCheckout(plan: string) {
    return this.request<{ sessionId: string; url: string }>('/subscriptions/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  }

  async cancelSubscription() {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request<{
      stats: unknown;
      chartData: unknown[];
      recentSignups: unknown[];
    }>('/dashboard/stats');
  }

  // Admin
  async getAdminTenants() {
    return this.request<{ tenants: Tenant[]; summary: unknown }>('/admin/tenants');
  }

  async updateTenantStatus(id: string, status: string) {
    return this.request(`/admin/tenants/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteTenant(id: string) {
    return this.request(`/admin/tenants/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

