import { Component, ViewEncapsulation, OnInit, Inject, PLATFORM_ID, } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EgresadosService }  from '../../services/egresados.service';
import { CatalogosService }  from '../../services/catalogos.service';
import { CreateEgresadoEtapa1 } from '../../models/egresado.interface';
import { Carrera, Genero, NivelIngles, SituacionLaboral, AntiguedadEmpleo,
  CertificacionVigente,
} from '../../models/catalogos.interface';

@Component({
  selector: 'app-egresados1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './egresados1.component.html',
  styleUrls: ['./egresados1.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Egresados1Component implements OnInit {

  form: FormGroup;
  mostrarExito  = false;
  enviando      = false;
  cargando      = true;
  errorMensaje  = '';

  // Catálogos
  carreras:                Carrera[]              = [];
  generos:                 Genero[]               = [];
  nivelesIngles:           NivelIngles[]          = [];
  situacionesLaborales:    SituacionLaboral[]     = [];
  antiguedades:            AntiguedadEmpleo[]     = [];
  certificacionesVigentes: CertificacionVigente[] = [];

  constructor(
    private fb:        FormBuilder,
    private router:    Router,
    private svc:       EgresadosService,
    private catalogos: CatalogosService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.form = this.fb.group({
      nombre:    ['', [Validators.required, Validators.minLength(3)]],
      genero:    ['', Validators.required],
      correo:    ['', [Validators.required, Validators.email]],
      telefono:  ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ciudad:    ['', Validators.required],
      carrera:       ['', Validators.required],
      anio:          ['', [Validators.required, Validators.min(1990), Validators.max(2026)]],
      titulacion:    ['', Validators.required],
      certificacion: ['', Validators.required],
      ingles:        ['', Validators.required],
      situacion:     ['', Validators.required],
      empresa:       [''],
      antiguedad:    ['', Validators.required],
      ciudadtrabajo: [''],
      satisfaccion:              ['', Validators.required],
      autorizacion_estadisticos: [false],
      autorizacion_contacto:     [false],
      autorizacion_actividades:  [false],
    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Carga todos los catálogos en paralelo con forkJoin
    forkJoin({
      carreras:                this.catalogos.getCarreras(),
      generos:                 this.catalogos.getGeneros(),
      nivelesIngles:           this.catalogos.getNivelesIngles(),
      situacionesLaborales:    this.catalogos.getSituacionesLaborales(),
      antiguedades:            this.catalogos.getAntiguedades(),
      certificacionesVigentes: this.catalogos.getCertificacionesVigentes(),
    }).subscribe({
      next: (data) => {
        this.carreras                = data.carreras;
        this.generos                 = data.generos;
        this.nivelesIngles           = data.nivelesIngles;
        this.situacionesLaborales    = data.situacionesLaborales;
        this.antiguedades            = data.antiguedades;
        this.certificacionesVigentes = data.certificacionesVigentes;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando     = false;
        this.errorMensaje = 'Error al cargar el formulario. Recarga la página.';
        console.error('Error cargando catálogos:', err);
      },
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.errorMensaje = '';

    if (this.form.invalid) {
      this.errorMensaje = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    const v = this.form.value;

    const payload: CreateEgresadoEtapa1 = {
      nombre_completo:        v.nombre,
      genero:                 v.genero,
      correo:                 v.correo,
      telefono:               v.telefono,
      ciudad_residencia:      v.ciudad,
      carrera:                v.carrera,
      anio_egreso:            Number(v.anio),
      estatus_titulacion:     v.titulacion,
      certificacion_vigente:  v.certificacion,
      nivel_ingles:           v.ingles,
      situacion_laboral:      v.situacion,
      empresa:                v.empresa       || '',
      antiguedad_empleo:      v.antiguedad,
      ciudad_trabajo:         v.ciudadtrabajo || '',
      satisfaccion_formacion: Number(v.satisfaccion),
      autorizaciones: {
        estadisticas: v.autorizacion_estadisticos,
        contacto:     v.autorizacion_contacto,
        eventos:      v.autorizacion_actividades,
      },
    };

    this.enviando = true;

    this.svc.enviarEtapa1(payload).subscribe({
      next: (resp) => {
        this.enviando = false;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('id_egresado',     String(resp.id_egresado));
          localStorage.setItem('correo_egresado', v.correo);
        }
        this.mostrarExito = true;
        setTimeout(() => {
          this.mostrarExito = false;
          this.router.navigate(['/egresados2']);
        }, 1500);
      },
      error: (err) => {
        this.enviando     = false;
        this.errorMensaje = err?.error?.message || 'Ocurrió un error al guardar. Intenta de nuevo.';
        console.error('Error Etapa 1:', err);
      },
    });
  }
}