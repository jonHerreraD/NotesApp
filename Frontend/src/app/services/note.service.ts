import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest, LoginResponse} from '../model/interface/user';
import {Observable} from 'rxjs';
import {CreateNoteRequest, Note, noteCreated} from '../model/interface/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  createNote(noteData: CreateNoteRequest): Observable<Note> {
    const headers = this.getAuthHeaders();
    return this.http.post<Note>(
      "http://localhost:8080/api/v1/notes" ,noteData, {headers});
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Match your login component

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


}
