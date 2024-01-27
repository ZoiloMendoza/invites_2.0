// styles.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StylesService {
  server;
  private estilosUrl = 'assets/estilos.json'; // Ruta al archivo JSON de estilos

  constructor(private http: HttpClient) {}

  getEstilos(): Observable<StyleConfigurarion> {
    return this.http.get<StyleConfigurarion>(this.estilosUrl);
  }
}
