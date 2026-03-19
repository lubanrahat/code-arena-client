import { httpClient } from "@/lib/axios/httpClient";

export const getProfileInfo = async () => {
  const { data } = await httpClient.get("/user/profile");
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfileInfo = async (payload: any) => {
  const { data } = await httpClient.put("/user/profile", payload);
  return data;
};
