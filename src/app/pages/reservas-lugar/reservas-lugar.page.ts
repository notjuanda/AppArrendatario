import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas-lugar',
  templateUrl: './reservas-lugar.page.html',
  styleUrls: ['./reservas-lugar.page.scss'],
})
export class ReservasLugarPage implements OnInit {
  lugar: any;
  reservas: any[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private reservasService: ReservasService
  ) {}

  ngOnInit() {
    const lugarId = this.route.snapshot.paramMap.get('id');
    if (lugarId) {
      this.loadLugarReservas(Number(lugarId));
    }
  }

  loadLugarReservas(lugarId: number) {
    this.reservasService.getReservasPorLugar(lugarId).subscribe(
      (data) => {
        this.lugar = {
          id: data.id,
          name: data.nombre,
          description: data.descripcion,
          city: data.ciudad,
          pricePerNight: data.precioNoche,
          cleaningCost: data.costoLimpieza,
          capacity: data.cantPersonas,
          rooms: data.cantHabitaciones,
          bathrooms: data.cantBanios,
          wifi: data.tieneWifi ? 'Sí' : 'No',
          parking: data.cantVehiculosParqueo,
          owner: {
            name: data.arrendatario.nombrecompleto,
            email: data.arrendatario.email,
            phone: data.arrendatario.telefono,
          },
          photos: data.fotos.map((photo: any) => photo.url),
          currentPhotoIndex: 0, // Inicializa el índice actual de fotos
        };
        this.reservas = data.reservas.map((reserva: any) => ({
          id: reserva.id,
          startDate: reserva.fechaInicio,
          endDate: reserva.fechaFin,
          totalPrice: reserva.precioTotal,
          customer: reserva.cliente.nombrecompleto,
          customerEmail: reserva.cliente.email,
          customerPhone: reserva.cliente.telefono,
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el lugar y las reservas:', error);
        this.isLoading = false;
      }
    );
  }

  prevPhoto() {
    this.lugar.currentPhotoIndex =
      (this.lugar.currentPhotoIndex - 1 + this.lugar.photos.length) %
      this.lugar.photos.length;
  }

  nextPhoto() {
    this.lugar.currentPhotoIndex =
      (this.lugar.currentPhotoIndex + 1) % this.lugar.photos.length;
  }
}
