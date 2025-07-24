import {Component, inject} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category, Tag} from '../../model/interface/note';
import {TagService} from '../../services/tag.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoaderComponent} from '../reusable/loader/loader.component';

@Component({
  selector: 'app-categories-tags',
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './categories-tags.component.html',
  styleUrl: './categories-tags.component.css'
})
export class CategoriesTagsComponent {

  categoryService = inject(CategoryService);
  tagService = inject(TagService);
  fb = inject(FormBuilder);
  categoryList: Category[] = [];
  tagList: Tag[] = [];

  isModalOpen: boolean = false;
  modalType: string = "";
  isLoading:boolean = true;


  ngOnInit() {
  this.onLoadCategories();
  this.onLoadTags();
}

  onLoadCategories(): void {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.isLoading=false;
      this.categoryList = res;
    })
  }

  onLoadTags(): void {
    this.tagService.getTags().subscribe((res: Tag[]) => {
      this.isLoading=false;
      this.tagList = res;
    })
  }

  createCategoryForm : FormGroup = this.fb.group({
    name: ['',Validators.required],
  })

  createTagForm : FormGroup = this.fb.group({
    names: [[]],
  })

  openModal(type: string): void {
    this.modalType = type;
    this.isModalOpen = true;
  }

  closeModal() {
    this.modalType = '';
    this.isModalOpen = false;
  }

  createCategory() {
    if (this.createCategoryForm.valid) {
      const categoryData = this.createCategoryForm.value;
      this.categoryService.createCategory(categoryData).subscribe({
        next: (res: Category) => {
          if (res.id){
            alert("Category created successfully.");
            this.closeModal();
            this.onLoadCategories();
          }else {
            alert("Failed to create category.");
          }
        },
        error:(err) =>{
          console.error("Failed to create category: ", err);
          alert("Failed to create category: " + err.message);
        }
      });
    }
  }

  createTag(){
    if (this.createTagForm.valid) {
      const singleName = this.createTagForm.value.names;
      const tagData = {names: [singleName]};
      this.tagService.createTag(tagData.names).subscribe({
        next: (res: Tag[]) => {
          if (res.length != 0){
            alert("Tag created successfully.");
            this.closeModal();
            this.onLoadTags();
          }else {
            alert("Failed to create tag.");
          }
        },
        error:(err) =>{
          console.error("Failed to create tag: ", err);
          alert("Failed to create tag: " + err.message);
        }
      });
    }
  }

  deleteCategory(category: Category) {
    if (category.noteCount == 0) {
      const id: string = category.id;
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.onLoadCategories(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }else{
      alert("You can't delete categories associated to notes.");
    }
  }

  deleteTag(tag: Tag) {
    if (tag.noteCount == 0){
      const id:string = tag.id;
      this.tagService.deleteTag(id).subscribe({
        next: () => {
          console.log('Tag deleted successfully');
          this.onLoadTags();
        },
        error: (err) => {
          console.error('Error deleting tag: ', err);
        }
      });
    }else{
      alert("You can't delete tags associated to notes.");
    }
  }

}
