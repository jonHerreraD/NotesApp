import {Component, inject, OnInit, HostListener} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {NoteService} from '../../services/note.service';
import {Category, Note, noteStatus, Tag} from '../../model/interface/note';
import {LoaderComponent} from '../reusable/loader/loader.component';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-see-notes',
  imports: [
    NgIf,
    LoaderComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './see-notes.component.html',
  styleUrl: './see-notes.component.css'
})
export class SeeNotesComponent {


  noteList: Note[] = [];

  currentType:string = "Active Notes";
  isTypeNotesOpen = false;
  isLoading:boolean = true;

  isModalOpen: boolean = false;

  categoryService = inject(CategoryService);
  tagService = inject(TagService);
  noteService = inject(NoteService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  token: string = "";

  categoryList: Category[] = [];
    tagList: Tag[] = [];

    selectedNote: Note | null = null;

  /*
  ngOnInit(): void {
    this.loadNotes();
  }

*/
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

  deleteNote(id: string): void{
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        console.log("Note deleted successfully");
        this.loadNotes();
    },
      error: (err) => {
        console.error("Error deleting note:", err);
      }
    });
  }

  // Multi-tag selector properties
  selectedTags: Tag[] = [];
  isTagDropdownOpen = false;

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multi-select')) {
      this.isTagDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.loadNotes();
    this.onLoadCategories();
    this.onLoadTags();
    this.token = this.authService.getToken();

    // Initialize selected tags if form has pre-existing values
    const formTagIds = this.updateNoteForm.get('tagIds')?.value || [];
    if (formTagIds.length > 0) {
      this.selectedTags = this.tagList.filter(tag =>
        formTagIds.includes(tag.id)
      );
    }
  }

  onLoadCategories(): void {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categoryList = res;
    })
  }

  onLoadTags(): void {
    this.tagService.getTags().subscribe((res: Tag[]) => {
      this.tagList = res;

      // Re-initialize selected tags after tags are loaded
      const formTagIds = this.updateNoteForm.get('tagIds')?.value || [];
      if (formTagIds.length > 0) {
        this.selectedTags = this.tagList.filter(tag =>
          formTagIds.includes(tag.id)
        );
      }
    })
  }

  updateNoteForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tagIds: [[]],
    categoryId: ['', Validators.required],
    content: ['', Validators.required],
    status: ['', Validators.required],
  })

  // Multi-tag selector methods
  toggleTagDropdown(): void {
    this.isTagDropdownOpen = !this.isTagDropdownOpen;
  }

  isTagSelected(tagId: string): boolean {
    return this.selectedTags.some(tag => tag.id === tagId);
  }

  onTagToggle(tagId: string, event: Event): void {
    event.stopPropagation();
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // Add tag
      const tag = this.tagList.find(t => t.id === tagId);
      if (tag && !this.isTagSelected(tagId)) {
        this.selectedTags.push(tag);
      }
    } else {
      // Remove tag
      this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagId);
    }

    // Update form control with selected tag IDs
    const selectedIds = this.selectedTags.map(tag => tag.id);
    this.updateNoteForm.patchValue({
      tagIds: selectedIds
    });
  }

  removeTag(event: Event, tagId: string): void {
    event.stopPropagation();
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagId);

    // Update form control with remaining tag IDs
    const selectedIds = this.selectedTags.map(tag => tag.id);
    this.updateNoteForm.patchValue({
      tagIds: selectedIds
    });
  }

  // Helper method to get selected tags count for display
  getSelectedTagsCount(): number {
    return this.selectedTags.length;
  }

  // Helper method to clear all selected tags
  clearAllTags(): void {
    this.selectedTags = [];
    this.updateNoteForm.patchValue({
      tagIds: []
    });
  }


  openModal(note: Note): void {
    this.selectedNote = note;
    this.isModalOpen = true;

  // Primero actualizar el formulario
  this.updateNoteForm.patchValue({
    title: this.selectedNote.title,
    tagIds: this.selectedNote.tags.map(tag => tag.id),
    categoryId: this.selectedNote.category.id,
    content: this.selectedNote.content,
    status: this.selectedNote.status
  });

  // Asegúrate de que los tags estén cargados antes de filtrar
  if (this.tagList.length > 0) {
    this.selectedTags = this.tagList.filter(tag =>
      note.tags.map(t => t.id).includes(tag.id)
    );
    
  } else {
    // Si los tags aún no se han cargado, espera a que se carguen
    this.tagService.getTags().subscribe((res: Tag[]) => {
      this.tagList = res;
      this.selectedTags = this.tagList.filter(tag =>
        note.tags.map(t => t.id).includes(tag.id)
      );
    });
  }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedNote = null;
  }


  updateNote(): void {
    if (this.updateNoteForm.valid && this.selectedNote) {
       const noteData = {
      ...this.updateNoteForm.value,
      id: this.selectedNote.id // ✅ Add the ID here
    };
      const noteId = this.selectedNote.id;
      console.log("Updating note with ID:", noteId, "Data:", noteData);

      this.noteService.updateNote(noteId, noteData).subscribe({
        next: (res: Note) => {
          console.log("Note updated successfully:", res);
          this.closeModal();
          this.loadNotes();
        },
        error: (err) => {
          console.error("Error updating note:", err);
          alert("Failed to update note: " + err.message);
        }
      });
    } else {
      alert("Please fill in all required fields.");
    }
  }

  protected readonly noteStatus = noteStatus;

}
