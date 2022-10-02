import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../../cores/config/endpoints';
import { getApiUrl } from '../../../../cores/services/api-url';
import { environment } from '../../../../../environments/environment';
import { PositionI } from '../../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  idAuthor: string = environment.authorId.toString();

  constructor(
    private http: HttpClient,
  ) { }

  getPositions() {
    const url = getApiUrl(ENDPOINTS.POSITION);
    return this.http.get<PositionI[]>(url);
  }

  getPositionById(id: number) {
    const url = getApiUrl(ENDPOINTS.POSITION) + `/${id}`;
    return this.http.get<PositionI>(url);
  }

}
