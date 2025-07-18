import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category, Note, noteCreated, noteStatus, Tag} from '../../model/interface/note';
import {TagService} from '../../services/tag.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NoteService} from '../../services/note.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-new-note',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent {

  categoryService = inject(CategoryService);
  tagService = inject(TagService);
  noteService = inject(NoteService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  token : string = "";

  categoryList: Category[] = [];
  tagList: Tag[] = [];

  ngOnInit(): void {
    this.onLoadCategories();
    this.onLoadTags();
    this.token = this.authService.getToken();
  }



  onLoadCategories(): void {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categoryList = res;
    })
  }

  onLoadTags(): void {
    this.tagService.getTags().subscribe((res: Tag[]) => {
      this.tagList = res;
    })
  }

  createNoteForm : FormGroup = this.fb.group({
    title: ['',Validators.required],
    tagIds: [[]],
    categoryId: ['', Validators.required],
    content: ['', Validators.required],
    status: ['', Validators.required],
  })

  onCreateNote() {
    if (this.createNoteForm.valid) {
      const noteData = this.createNoteForm.value;
      this.noteService.createNote(noteData).subscribe({
        next: (res: Note) => {
          console.log(res.category.id);
          console.log(res.category.name);
          if (res.id){
            alert("Note created successfully.");
          }else{
            alert("Failed to create note.");
          }
        },
        error:(err) =>{
          console.error("Failed to create note: ", err);
          alert("Failed to create note: " + err.message);
        }
      });
    }
  }

  //protected readonly noteStatus = noteStatus;
  protected readonly noteStatus = noteStatus;
}
