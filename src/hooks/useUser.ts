import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfileInfo, updateProfileInfo } from "../services/user.service";
import { toast } from "sonner";
import { useAuthUser } from "./useAuth";

export const useProfile = () => {
  const { user } = useAuthUser();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileInfo,
    enabled: !!user,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });
};
