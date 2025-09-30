export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
}

export interface ApiListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface ApiSingleResponse {
  data: User;
}
