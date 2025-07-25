import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest, LoginResponse} from '../model/interface/user';
import {Observable} from 'rxjs';
import {CreateNoteRequest, Note, noteCreated, Tag} from '../model/interface/note';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  authService = inject(AuthService);

  createNote(noteData: CreateNoteRequest): Observable<Note> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Note>(
      "http://localhost:8080/api/v1/notes" ,noteData, {headers});
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(
      "http://localhost:8080/api/v1/notes"
    )
  }
  getArchivedNotes(): Observable<Note[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Note[]>(
      "http://localhost:8080/api/v1/notes/archived", {headers});
  }

  deleteNote(id: string): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(
      `http://localhost:8080/api/v1/notes/${id}`, {headers}
    )
  }

}
