import { request } from "../utils/request";

export const removePostAsync = (id) => () =>
  request(`/api/posts/${id}`, "DELETE");
