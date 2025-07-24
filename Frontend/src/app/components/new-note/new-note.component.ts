import { Component, inject, OnInit, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {TagService} from '../../services/tag.service';
import {NoteService} from '../../services/note.service';
import {AuthService} from '../../services/auth.service';
import {Category, Note, noteStatus, Tag} from '../../model/interface/note';

@Component({
  selector: 'app-new-note',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent implements OnInit {

  categoryService = inject(CategoryService);
  tagService = inject(TagService);
  noteService = inject(NoteService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  token: string = "";

  categoryList: Category[] = [];
  tagList: Tag[] = [];

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
    this.onLoadCategories();
    this.onLoadTags();
    this.token = this.authService.getToken();

    // Initialize selected tags if form has pre-existing values
    const formTagIds = this.createNoteForm.get('tagIds')?.value || [];
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
      const formTagIds = this.createNoteForm.get('tagIds')?.value || [];
      if (formTagIds.length > 0) {
        this.selectedTags = this.tagList.filter(tag =>
          formTagIds.includes(tag.id)
        );
      }
    })
  }

  createNoteForm: FormGroup = this.fb.group({
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
    this.createNoteForm.patchValue({
      tagIds: selectedIds
    });
  }

  removeTag(event: Event, tagId: string): void {
    event.stopPropagation();
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagId);

    // Update form control with remaining tag IDs
    const selectedIds = this.selectedTags.map(tag => tag.id);
    this.createNoteForm.patchValue({
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
    this.createNoteForm.patchValue({
      tagIds: []
    });
  }

  onCreateNote(): void {
    if (this.createNoteForm.valid) {
      const noteData = this.createNoteForm.value;

      // Log the data being sent (for debugging)
      console.log('Creating note with data:', noteData);
      console.log('Selected tags:', this.selectedTags);

      this.noteService.createNote(noteData).subscribe({
        next: (res: Note) => {
          console.log('Note created:', res);
          console.log(res.category?.id);
          console.log(res.category?.name);
          if (res.id) {
            alert("Note created successfully.");
            // Optionally reset the form and selected tags
            this.resetForm();
          } else {
            alert("Failed to create note.");
          }
        },
        error: (err) => {
          console.error("Failed to create note: ", err);
          alert("Failed to create note: " + err.message);
        }
      });
    } else {
      // Show validation errors
      this.markFormGroupTouched();
      console.log('Form is invalid:', this.createNoteForm.errors);
    }
  }

  // Helper method to mark all form controls as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.createNoteForm.controls).forEach(key => {
      const control = this.createNoteForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to reset form and clear selections
  private resetForm(): void {
    this.createNoteForm.reset();
    this.selectedTags = [];
    this.isTagDropdownOpen = false;
  }

  protected readonly noteStatus = noteStatus;
}
