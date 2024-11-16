import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  properties: any[] = [];
  isLoading = true; // Indicador de carga

  constructor(
    private lugaresService: LugaresService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser(); // Obtén el usuario logueado
    if (user) {
      this.loadProperties(user.id); // Usa el ID del arrendatario
    } else {
      console.error('Usuario no encontrado en el almacenamiento.');
      this.isLoading = false;
    }
  }

  loadProperties(arrendatarioId: number) {
    this.lugaresService.getLugaresPorArrendatario(arrendatarioId).subscribe(
      (data) => {
        // Mapeo de propiedades
        this.properties = data.map((property: any) => ({
          id: property.id,
          name: property.nombre,
          city: property.ciudad,
          pricePerNight: property.precioNoche,
          photoUrl: property.fotos.length > 0 ? property.fotos[0].url : 'assets/images/no-image.png', // Muestra la primera foto o una predeterminada
        }));
        this.isLoading = false; // Detener el indicador de carga
      },
      (error) => {
        console.error('Error al cargar los lugares:', error);
        this.isLoading = false; // Detener el indicador de carga incluso si hay error
      }
    );
  }

  onAddProperty() {
    console.log('Add Property clicked');
    // Redirigir a la página de creación de un nuevo lugar
  }

  onEditProperty(propertyId: number) {
    console.log('Edit Property clicked:', propertyId);
    // Redirigir a la página de edición del lugar
  }
}
