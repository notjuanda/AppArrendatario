import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresService } from 'src/app/services/lugares.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

declare let google: any;

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.page.html',
  styleUrls: ['./lugar-form.page.scss'],
})
export class LugarFormPage implements OnInit, AfterViewInit {
  lugarForm: FormGroup;
  isEditMode = false;
  lugarId!: number;
  arrendatarioId!: number;

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  marker: any;

  constructor(
    private fb: FormBuilder,
    private lugaresService: LugaresService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController // Para mostrar mensajes flotantes
  ) {
    this.lugarForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantPersonas: [1, [Validators.required, Validators.min(1)]],
      cantCamas: [1, [Validators.required, Validators.min(1)]],
      cantBanios: [1, [Validators.required, Validators.min(1)]],
      cantHabitaciones: [1, [Validators.required, Validators.min(1)]],
      tieneWifi: [false],
      cantVehiculosParqueo: [0, [Validators.required, Validators.min(0)]],
      precioNoche: ['', Validators.required],
      costoLimpieza: ['', Validators.required],
      ciudad: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  async ngOnInit() {
    const user = await this.authService.getUser();
    if (user && user.id) {
      this.arrendatarioId = user.id;
    } else {
      console.error('ID del arrendatario no encontrado en el almacenamiento.');
      return;
    }

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.lugarId = +params['id'];
        this.loadLugar(this.lugarId);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  initMap() {
    const defaultPosition = this.getMapPosition();

    if (this.mapElement?.nativeElement) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: defaultPosition,
        zoom: 14,
      });

      this.marker = new google.maps.Marker({
        position: defaultPosition,
        map: this.map,
        draggable: true,
      });

      this.marker.addListener('dragend', () => {
        const position = this.marker.getPosition();
        if (position) {
          this.lugarForm.patchValue({
            latitud: position.lat(),
            longitud: position.lng(),
          });
        }
      });
    } else {
      console.error('El elemento del mapa no está disponible.');
    }
  }

  loadLugar(id: number) {
    this.lugaresService.getLugarPorId(id).subscribe((lugar) => {
      this.lugarForm.patchValue(lugar);

      const position = {
        lat: parseFloat(lugar.latitud),
        lng: parseFloat(lugar.longitud),
      };

      if (this.map && this.marker) {
        this.map.setCenter(position);
        this.marker.setPosition(position);
      } else {
        this.initMap();
      }
    });
  }

  getMapPosition() {
    return {
      lat: this.lugarForm.value.latitud
        ? parseFloat(this.lugarForm.value.latitud)
        : -17.7828703,
      lng: this.lugarForm.value.longitud
        ? parseFloat(this.lugarForm.value.longitud)
        : -63.180618,
    };
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    await toast.present();
  }

  increment(field: string) {
    const currentValue = this.lugarForm.get(field)?.value || 0;
    this.lugarForm.patchValue({ [field]: currentValue + 1 });
  }

  decrement(field: string) {
    const currentValue = this.lugarForm.get(field)?.value || 1;
    if (currentValue > 0) {
      this.lugarForm.patchValue({ [field]: currentValue - 1 });
    }
  }

  onSubmit() {
    const lugarData = {
      ...this.lugarForm.value,
      latitud: String(this.lugarForm.value.latitud),
      longitud: String(this.lugarForm.value.longitud),
      arrendatario_id: this.arrendatarioId,
    };

    if (this.isEditMode) {
      this.lugaresService.editarLugar(this.lugarId, lugarData).subscribe(
        async () => {
          await this.presentToast('Lugar editado con éxito.');
          this.router.navigate(['/tabs/main']).then(() => {
            window.location.reload();
          });
        },
        async (error) => {
          console.error('Error al editar el lugar:', error);
          await this.presentToast('Error al editar el lugar.', 'danger');
        }
      );
    } else {
      this.lugaresService.crearLugar(lugarData).subscribe(
        async () => {
          await this.presentToast('Lugar creado con éxito.');
          this.router.navigate(['/tabs/main']).then(() => {
            window.location.reload();
          });
        },
        async (error) => {
          console.error('Error al crear el lugar:', error);
          await this.presentToast('Error al crear el lugar.', 'danger');
        }
      );
    }
  }
}
