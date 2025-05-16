import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentUser: any; // Puedes reemplazar `any` con una interfaz específica
  public loading: boolean = false; // Agregamos la propiedad `loading`

  constructor() {
    // Inicializamos currentUser con los datos almacenados en localStorage (si existen)
    this.currentUser = localStorage.getItem('currentUser') 
      ? JSON.parse(localStorage.getItem('currentUser')) 
      : null;
  }

  ngOnInit() {
    // Simulamos una carga para mostrar el spinner
    this.loading = true;
    setTimeout(() => {
      this.loading = false; // Terminamos la "carga" después de 2 segundos
    }, 2000);
  }
}

