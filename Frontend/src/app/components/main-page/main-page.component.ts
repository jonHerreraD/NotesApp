import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  isProfileDropdownOpen = false;
  isMobileMenuOpen = false;

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
