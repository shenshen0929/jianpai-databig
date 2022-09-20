import { http } from "@/api/index_self.js";

export const orderListApi = () => {
  return http({
    url: "/stepApi",
    params: {},
  });
};
