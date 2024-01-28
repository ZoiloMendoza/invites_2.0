import { Injectable, inject } from '@angular/core';
import { ServerService } from '../../common/services/server.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvitationResponse } from '../types/invites';

@Injectable({
  providedIn: 'root',
})
export class WeddingConfigService {
  serverService = inject(ServerService);
  constructor(private http: HttpClient) {}

  getWeddingConfig(request: {
    path: string;
    invitationId: string;
  }): Observable<InvitationResponse> {
    const response = this.http.post<InvitationResponse>(
      `${this.serverService.getBackendServer()}/api/v1/wedding`,
      request,
    );

    return response;
  }
}
