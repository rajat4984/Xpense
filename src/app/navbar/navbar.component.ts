import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  animate,
  style,
  state,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedService } from '../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule,RouterLink],
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
  @Input() subHeading: string = '';
  @Input() logo:string = "";
  receivedData: boolean | undefined;
  private unsubscribe = new Subject<void>();

  isOpen = false;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService
      .getData$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.receivedData = data;
      });
  }

  toggle() {
    this.receivedData = !this.receivedData;
    this.sharedService.setData(this.receivedData);
  }
}
