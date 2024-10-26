import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
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
