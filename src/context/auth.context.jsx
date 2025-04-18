import { useLogin, useLogout, useRegister, useUser } from "@/hooks/useUser";
import React, { createContext, useContext } from "react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
    isSuccess: isUserSucess,
    isError: isUserError,
    refetch: refetchUser,
  } = useUser();
  console.log(user);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingUser,
    isError: isUserError,
    error: userError,
    isSuccess: isUserSucess,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
