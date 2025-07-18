import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddNoteComponent} from '../add-note/add-note.component';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, AddNoteComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  currentComponent : string = "";
  isProfileDropdownOpen = false;
  isMobileMenuOpen = false;


  changeTab(tabName: string) {
    this.currentComponent = tabName;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeDropdowns(event?: Event) {
    // Solo cerrar si el click no es en un botón de toggle
    if (event && (event.target as HTMLElement).closest('[id="user-menu-button"], [aria-controls="mobile-menu"]')) {
      return;
    }
    this.isProfileDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }
}
