import { Injectable, inject } from '@angular/core';
import { ServerService } from '../../common/services/server.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InviteConfiguration } from '../types/invites';

@Injectable({
  providedIn: 'root',
})
export class WeddingConfigService {
  serverService = inject(ServerService);
  constructor(private http: HttpClient) {}

  getWeddingConfig(weddingId: string): Observable<InviteConfiguration> {
    const response = this.http.post<InviteConfiguration>(
      `${this.serverService.getBackendServer()}/api/v1/wedding`,
      { weddingId },
    );

    return response;
  }
}
