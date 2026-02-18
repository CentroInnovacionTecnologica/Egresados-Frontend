import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PresentacionComponent } from "../../components/presentacion/presentacion.component";

@Component({
  selector: 'app-index',
  imports: [NavbarComponent, PresentacionComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
