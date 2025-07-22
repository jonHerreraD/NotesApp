import {Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {NoteService} from '../../services/note.service';
import {Note} from '../../model/interface/note';
import {LoaderComponent} from '../reusable/loader/loader.component';

@Component({
  selector: 'app-see-notes',
  imports: [
    NgIf,
    LoaderComponent
  ],
  templateUrl: './see-notes.component.html',
  styleUrl: './see-notes.component.css'
})
export class SeeNotesComponent {

  noteService = inject(NoteService);
  noteList: Note[] = [];

  currentType:string = "Active Notes";
  isTypeNotesOpen = false;
  isLoading:boolean = true;

  ngOnInit(): void {
    this.loadNotes();
  }

  toggleTypeNotesOpen(): void {
    this.isTypeNotesOpen = !this.isTypeNotesOpen;
  }

  changeNotesType(type: string): void {
    this.currentType = type;
  }

  loadNotes(){
    if (this.currentType == "Active Notes") {
      this.noteService.getAllNotes().subscribe((res: Note[]) => {
        this.isLoading = false;
        this.noteList = res;
      })
    }else if (this.currentType == "Archived Notes") {
      this.noteService.getArchivedNotes().subscribe((res: Note[]) => {
        this.isLoading = false;
        this.noteList = res;
      })
    }
  }

}
