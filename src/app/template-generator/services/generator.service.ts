import { Injectable, inject } from '@angular/core';
import { ServerService } from '../../common/services/server.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InviteConfiguration } from '../../invites/types/invites';
import { CreateWeddingRequest, WeddingType } from '../types/wedding';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  serverService = inject(ServerService);
  constructor(private http: HttpClient) {}

  getWeddingConfig(weddingId: string): Observable<InviteConfiguration> {
    const response = this.http.post<InviteConfiguration>(
      `${this.serverService.getBackendServer()}/api/v1/wedding/config`,
      { weddingId },
    );

    return response;
  }

  createWedding(weddingData: CreateWeddingRequest): Observable<WeddingType> {
    const response = this.http.post<WeddingType>(
      `${this.serverService.getBackendServer()}/api/v1/wedding/create`,
      weddingData,
    );

    return response;
  }

  updateWeddingConfig(
    weddingId: string,
    config: InviteConfiguration,
  ): Observable<InviteConfiguration> {
    const response = this.http.post<InviteConfiguration>(
      `${this.serverService.getBackendServer()}/api/v1/wedding/config/update`,
      { weddingId, config },
    );

    return response;
  }

  listWeddings(): Observable<{ weddings: WeddingType[] }> {
    return this.http.get<{ weddings: WeddingType[] }>(
      `${this.serverService.getBackendServer()}/api/v1/wedding/list`,
    );
  }
}
