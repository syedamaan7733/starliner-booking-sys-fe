import { api } from "./index.service";

export const authApi = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post("auth/register", userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    console.log(credentials);
    
    const response = await api.post("auth/login", credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.get("auth/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      return { success: true };
    }
  },

  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get("auth/me");
    return response.data;
  },
};
