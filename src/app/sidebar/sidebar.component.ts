import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          visibility: 'visible',
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          visibility: 'hidden',
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('open <=> close', [animate('0.5s ease')]),
    ]),
  ],
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;

  isSmallScreen: boolean = false; // Initialize as false
  receivedData: boolean | undefined;
  private unsubscribe = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth >= 1024; // Initialize based on window size
    }
  }

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

  mainMenuArr = [
    {
      key: 1,
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      key: 2,
      name: 'Transactions',
      icon: 'attach_money',
    },
    {
      key: 3,
      name: 'Card',
      icon: 'credit_card',
    },
    {
      key: 4,
      name: 'Reports',
      icon: 'insert_drive_file',
    },
    {
      key: 5,
      name: 'Contact',
      icon: 'contacts',
    },
    {
      key: 6,
      name: 'Settings',
      icon: 'settings',
    },
    {
      key: 7,
      name: 'Help Center',
      icon: 'contact_support',
    },
  ];
}
