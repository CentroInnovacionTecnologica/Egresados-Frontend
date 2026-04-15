import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egresados1',
  imports: [CommonModule],
  templateUrl: './egresados1.component.html',
  styleUrls: ['./egresados1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Egresados1Component {

  mostrarExito = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.mostrarExito = true;

    setTimeout(() => {
      this.mostrarExito = false;
      this.router.navigate(['/egresados2']);
    }, 1500);
  }
}