// src/hooks/auth.hooks.js
import { authApi } from "@/services/auth.service";
import { authToken } from "@/services/token.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useUser() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,

    enabled: !!authToken.getToken(),
    initialData: () => queryClient.getQueryData(["user"]),
  });
}

// Registration
export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      authToken.setToken(data.token);
      queryClient.setQueryData(["user"], data.user); // Set cache
      toast.success("Registered Successfully.");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
}

// login
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      authToken.setToken(data.token);
      queryClient.setQueryData(["user"], data.user); // Set cache
      queryClient.invalidateQueries(["user"]); //  fresh data getting
      toast.success(`Welcome back! ${data.user.name}`);

      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || errx);
    },
  });
}

//logout
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      authToken.removeToken();
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries();
      navigate("/auth");
    },
  });
}
