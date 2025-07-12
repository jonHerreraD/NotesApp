import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './components/main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
