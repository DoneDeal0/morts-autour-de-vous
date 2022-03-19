import ax from "axios";

export const api = ax.create({
  timeout: 4000,
  withCredentials: true,
});
