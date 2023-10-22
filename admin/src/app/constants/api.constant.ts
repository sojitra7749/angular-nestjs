import { environment } from "src/environments/environment";

export const API = {
  LOGIN: `${environment.API_URL}/api/auth/login`,
  USERS: `${environment.API_URL}/api/user`,
};
