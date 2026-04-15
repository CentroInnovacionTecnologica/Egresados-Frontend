import { Component, ViewEncapsulation, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-egresados2',
  imports: [CommonModule],
  templateUrl: './egresados2.component.html',
  styleUrls: ['./egresados2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Egresados2Component implements OnInit {

  mostrarExito = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit() {
    this.mostrarExito = true;

    setTimeout(() => {
      this.mostrarExito = false;
      this.router.navigate(['/index']);
    }, 3500);
  }
}