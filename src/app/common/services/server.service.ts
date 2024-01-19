import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  forceLocal = false;
  constructor() {}

  getBackendServer() {
    if (this.isLocal() || this.forceLocal) {
      return 'http://localhost:3001';
    } else {
      return 'https://api.andreaydiego.website';
    }
  }

  isLocal() {
    return window.location.href.includes('localhost');
  }
}
