import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ENDPOINTS } from '../../../../cores/config/endpoints';
import { getApiUrl } from '../../../../cores/services/api-url';
import { PlayerI, SearchI } from '../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  idAuthor: string = environment.authorId.toString();

  constructor(private http: HttpClient) { }

  getPlayers() {
    const url = getApiUrl(ENDPOINTS.PLAYER);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'author': this.idAuthor
      })
    };
    return this.http.get<PlayerI[]>(url, httpOptions);
  }

  getPlayerById(id: number) {
    const url = getApiUrl(ENDPOINTS.PLAYER) + `/${id}`;
    return this.http.get(url);
  }

  postPlayer(player: PlayerI) {
    const url = getApiUrl(ENDPOINTS.PLAYER);
    return this.http.post<PlayerI>(url, player);
  }

  updatePlayerById(id: number, player: PlayerI) {
    const url = getApiUrl(ENDPOINTS.PLAYER) + `/${id}`;
    return this.http.put(url, player);
  }

  deletePlayerById(id?: number) {
    const url = getApiUrl(ENDPOINTS.PLAYER) + `/${id}`;
    return this.http.delete(url);
  }

  postSearchPlayer(search: SearchI) {
    const url = getApiUrl(ENDPOINTS.PLAYER);
    const headers = new HttpHeaders().set("author", this.idAuthor);
    return this.http.post(url, search, { headers });
  }



}



// https://angular.io/guide/http
// https://stackoverflow.com/questions/45286764/adding-a-http-header-to-the-angular-httpclient-doesnt-send-the-header-why

// const headers = new HttpHeaders().set("author", this.idAuthor);
// return this.http.get<PlayerI[]>(url, { headers });