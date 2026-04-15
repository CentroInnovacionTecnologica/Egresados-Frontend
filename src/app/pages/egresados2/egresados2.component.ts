import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egresados2',
  imports: [CommonModule],
  templateUrl: './egresados2.component.html',
  styleUrls: ['./egresados2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Egresados2Component implements OnInit {

  mostrarExito = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {

    this.mostrarExito = true;

    setTimeout(() => {
      this.mostrarExito = false;
      this.router.navigate(['/index']);
    }, 3500);
  }
}