import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugaresService } from 'src/app/services/lugares.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  lugares: any[] = [];
  isLoading = true;

  constructor(
    private lugaresService: LugaresService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (user) {
      this.loadLugares(user.id);
    } else {
      console.error('Usuario no encontrado en el almacenamiento.');
      this.isLoading = false;
    }
  }

  loadLugares(arrendatarioId: number) {
    this.lugaresService.getLugaresPorArrendatario(arrendatarioId).subscribe(
      (data) => {
        this.lugares = data.map((lugar: any) => ({
          id: lugar.id,
          name: lugar.nombre,
          city: lugar.ciudad,
          pricePerNight: lugar.precioNoche,
          photo: lugar.fotos.length > 0 ? lugar.fotos[0].url : 'assets/images/no-image.png',
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los lugares:', error);
        this.isLoading = false;
      }
    );
  }

  onViewReservas(lugarId: number) {
    this.router.navigate([`/tabs/reservas/lugar/${lugarId}`]);
  }
}
