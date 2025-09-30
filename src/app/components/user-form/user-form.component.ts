import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(UserService);

  id?: number;
  model: Partial<User> = {
    first_name: '', last_name: '', username: '', email: '', image: ''
  };

  ngOnInit(): void {
    const nav: any = history.state ?? {};
    this.id = Number(this.route.snapshot.paramMap.get('id')) || undefined;

    if (this.id) {
      this.api.getUser(this.id).subscribe({
        next: r => {
          const u = r.data;
          this.model = {
            first_name: nav.first_name ?? u.first_name,
            last_name:  nav.last_name  ?? u.last_name,
            username:   nav.username   ?? u.username,
            email:      nav.email      ?? u.email,
            image:      nav.image      ?? u.image
          };
        },
        error: _ => { /* si falla API, sigue con state si lo hay */ }
      });
    } else if (nav) {
      this.model = { ...this.model, ...nav };
    }
  }

  save() {
    const payload: Partial<User> = {
      first_name: this.model.first_name || '',
      last_name:  this.model.last_name  || '',
      username:   this.model.username   || '',
      email:      this.model.email      || '',
      image:      this.model.image      || ''
    };

    const req = this.id
      ? this.api.updateUser(this.id, payload)
      : this.api.createUser(payload);

    req.subscribe({
      next: _ => this.router.navigateByUrl('/home'),
      error: _ => {
        alert('Ojo: esta API de demo a veces no guarda cambios. Te llevo al inicio.');
        this.router.navigateByUrl('/home');
      }
    });
  }
}
