import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(UserService);

  user?: User;
  loading = false;
  error = '';

  displayEmail = '';
  displayUsername = '';
  displayImage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.error = 'ID inválido'; return; }

    const nav: any = history.state ?? {};
    const navImage:    string = typeof nav.image === 'string' ? nav.image : '';
    const navEmail:    string = typeof nav.email === 'string' ? nav.email : '';
    const navUsername: string = typeof nav.username === 'string' ? nav.username : '';
    const navFirst:    string = typeof nav.first_name === 'string' ? nav.first_name : '';
    const navLast:     string = typeof nav.last_name  === 'string' ? nav.last_name  : '';

    this.loading = true;
    this.api.getUser(id).subscribe({
      next: r => {
        const u = r.data as User;

        const apiEmail    = u.email ?? '';
        const apiUsername = u.username ?? (apiEmail ? apiEmail.split('@')[0] : '');
        const apiFirst    = u.first_name ?? '';
        const apiLast     = u.last_name ?? '';

        this.displayEmail    = navEmail    || apiEmail    || 'N/D';
        this.displayUsername = navUsername || apiUsername || 'N/D';
        this.displayImage    = navImage    || u.image     || `https://i.pravatar.cc/320?img=${u.id ?? id}`;

        this.user = {
          ...u,
          first_name: navFirst || apiFirst,
          last_name:  navLast  || apiLast,
          username:   this.displayUsername,
          email:      this.displayEmail
        };

        this.loading = false;
      },
      error: _ => { this.error = 'No se pudo cargar el usuario.'; this.loading = false; }
    });
  }
}
