import { Component } from '@angular/core';
import {NewNoteComponent} from '../new-note/new-note.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-note',
  imports: [
    NewNoteComponent
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  isBtnPushed: boolean = false;

  pushedBtn(){
    this.isBtnPushed = !this.isBtnPushed;
  }

  btnPushed(button: any){
    button.classList.add('pushed');
    setTimeout(()=>{
      button.classList.remove('pushed');
    }, 600);
  }

  protected readonly onclick = onclick;
}
