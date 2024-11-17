import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugaresService } from 'src/app/services/lugares.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  properties: any[] = [];
  isLoading = true;

  constructor(
    private lugaresService: LugaresService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (user) {
      this.loadProperties(user.id);
    } else {
      console.error('Usuario no encontrado en el almacenamiento.');
      this.isLoading = false;
    }
  }

  loadProperties(arrendatarioId: number) {
    this.lugaresService.getLugaresPorArrendatario(arrendatarioId).subscribe(
      (data) => {
        this.properties = data.map((property: any) => ({
          id: property.id,
          name: property.nombre,
          city: property.ciudad,
          pricePerNight: property.precioNoche,
          photos: property.fotos.length > 0 ? property.fotos : [{ url: 'assets/images/no-image.png' }],
          currentPhotoIndex: 0,
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los lugares:', error);
        this.isLoading = false;
      }
    );
  }

  prevPhoto(property: any) {
    property.currentPhotoIndex =
      (property.currentPhotoIndex - 1 + property.photos.length) % property.photos.length;
  }

  nextPhoto(property: any) {
    property.currentPhotoIndex = (property.currentPhotoIndex + 1) % property.photos.length;
  }

  onAddProperty() {
    this.router.navigate(['/tabs/main/create']);
  }

  onEditProperty(propertyId: number) {
    this.router.navigate([`/tabs/main/edit/${propertyId}`]);
  }

  async onAddPhoto(propertyId: number) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        this.lugaresService.agregarFoto(propertyId, file).subscribe(
          async () => {
            const toast = await this.toastController.create({
              message: 'Foto agregada exitosamente.',
              duration: 2000,
              color: 'success',
            });
            toast.present();
            this.loadProperties(await this.authService.getUser().then((u) => u.id));
          },
          async (error) => {
            console.error('Error al subir la foto:', error);
            const toast = await this.toastController.create({
              message: 'Error al agregar la foto.',
              duration: 2000,
              color: 'danger',
            });
            toast.present();
          }
        );
      }
    };

    fileInput.click();
  }
}
