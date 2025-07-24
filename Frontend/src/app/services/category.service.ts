import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category, CreateCategoryRequest} from '../model/interface/note';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  authService = inject(AuthService);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      "http://localhost:8080/api/v1/categories"
    )
  }

  getCategorieId(){

  }

  createCategory(categoryData: CreateCategoryRequest): Observable<Category>{
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Category>(
      "http://localhost:8080/api/v1/categories", categoryData, {headers});
  }

  deleteCategory(id: string): Observable<void> {
    const headers = this.authService.getAuthHeaders();
     return this.http.delete<void>(
      `http://localhost:8080/api/v1/categories/${id}`,{headers}
    )
  }
}
