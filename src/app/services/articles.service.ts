import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private _http: HttpClient) { }

  addArticle(data:any): Observable<any> {
    return this._http.post('http://localhost:3000/articles', data);
  }

  updateArticle(id: number,data:any): Observable<any> {
    return this._http.put(`http://localhost:3000/articles/${id}`, data);
  }

  getArticlesList(): Observable<any> {
    return this._http.get('http://localhost:3000/articles');
  }

  deleteArticle(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/articles/${id}`);
  }
}
