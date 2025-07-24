import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateTagRequest, Tag} from '../model/interface/note';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  authService = inject(AuthService);

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(
      "http://localhost:8080/api/v1/tags"
    )
  }

  createTag(names: string[]): Observable<Tag[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Tag[]>(
      "http://localhost:8080/api/v1/tags",{names}, {headers});
  }

  deleteTag(id: string): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(
      `http://localhost:8080/api/v1/tags/${id}`,{headers}
    )
  }
}
