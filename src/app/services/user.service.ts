import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiListResponse, ApiSingleResponse, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page = 1): Observable<ApiListResponse> {
    return this.http.get<any>(`${this.api}?page=${page}`).pipe(
      map((r: any) => {
        const raw = r?.data ?? r?.results ?? [];
        const data: User[] = (raw as any[]).map((u: any) => ({
          id: u.id ?? u._id ?? 0,
          first_name: u.first_name ?? u.firstName ?? u.name ?? '',
          last_name:  u.last_name  ?? u.lastName  ?? '',
          username:   u.username   ?? '',
          email:      u.email      ?? '',
          image:      u.image      ?? u.avatar ?? `https://i.pravatar.cc/120?img=${u.id ?? 1}`
        }));

        const pageNum    = r?.page ?? 1;
        const perPage    = r?.per_page ?? (data.length || 6);                // (??) con (||) entre paréntesis
        const totalPages = r?.total_pages ?? 1;
        const total      = (r?.total ?? (totalPages * perPage)) || data.length; // todo entre paréntesis

        return { page: pageNum, per_page: perPage, total, total_pages: totalPages, data };
      })
    );
  }

  getUser(id: number): Observable<ApiSingleResponse> {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      map((r: any) => {
        const u = r?.data ?? r?.result ?? r?.user ?? {};
        const data: User = {
          id: u.id ?? u._id ?? id,
          first_name: u.first_name ?? u.firstName ?? u.name ?? '',
          last_name:  u.last_name  ?? u.lastName  ?? '',
          username:   u.username   ?? '',
          email:      u.email      ?? '',
          image:      u.image      ?? u.avatar ?? `https://i.pravatar.cc/320?img=${u.id ?? id}`
        };
        return { data };
      })
    );
  }

  createUser(payload: Partial<User>) { return this.http.post(`${this.api}`, payload); }
  updateUser(id: number, payload: Partial<User>) { return this.http.put(`${this.api}/${id}`, payload); }
  deleteUser(id: number) { return this.http.delete(`${this.api}/${id}`); }
}
