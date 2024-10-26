import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  animate,
  style,
  state,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          display: 'flex',
        })
      ),
      state(
        'close',
        style({
          display: 'none',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class NavbarComponent {
  isOpen = true;

  toggle() {
    console.log('Hello');
    this.isOpen = !this.isOpen;
  }
}
