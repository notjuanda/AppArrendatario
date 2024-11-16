import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombrecompleto: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/), // Asegura que el teléfono tenga 10 dígitos
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']); // Redirige al login tras registro exitoso
        },
        (error) => {
          console.error('Error en registro:', error);
          // Manejo de errores
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
