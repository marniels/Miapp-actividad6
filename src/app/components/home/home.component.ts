import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private api = inject(UserService);

  users: User[] = [];
  loading = false;
  error = '';
  page = 1;
  totalPages = 1;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getUsers(this.page).subscribe({
      next: (r) => {
        this.users = r.data;
        this.totalPages = r.total_pages ?? 1;
        this.loading = false;
      },
      error: _ => { this.error = 'No se pudo cargar el listado'; this.loading = false; }
    });
  }

  displayUsername(u: User) {
    return u.username || (u.email ? u.email.split('@')[0] : '');
  }

  // Paginación
  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  // Aliases por si tu HTML usa español
  anterior() { this.prev(); }
  siguiente() { this.next(); }

  // Borrar
  delete(id: number) {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.api.deleteUser(id).subscribe({
      next: _ => this.users = this.users.filter(x => x.id !== id),
      error: _ => alert('La API de demo a veces no guarda cambios; actualiza para verificar.')
    });
  }
}
