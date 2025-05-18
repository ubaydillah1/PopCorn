type Role = "ADMIN" | "USER";

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at?: string;
}
