import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
