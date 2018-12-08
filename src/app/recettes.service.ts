import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface RecetteReponse {
  data: any;
  resp: any;
}

@Injectable({
  providedIn: 'root'
})
export class RecettesService {

  constructor(private http: HttpClient) { }

  getRecettes(page, category) {
    return this.http.get<RecetteReponse>(`${environment.api}/recettes/${page}/${category}`);
  }

  getCategories() {
    return this.http.get<RecetteReponse>(`${environment.api}/categories`);
  }

  getRecette(id) {
    return this.http.get<RecetteReponse>(`${environment.api}/recette/${id}`);
  }
}
