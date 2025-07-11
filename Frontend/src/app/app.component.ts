import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './components/main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
