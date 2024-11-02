import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/index.reducers';
import { CommonModule } from '@angular/common';
import { globalStateInterface } from '../store/global/global.reducers';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
animations: [
    trigger('openNotification', [
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
          transform: 'translateX(150%)',
          opacity: 0,
        })
      ),
    ]),
  ],
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notification$!: Observable<boolean>;
  notificationText$!: Observable<string>;
  notificationIcon$!: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.notification$ = this.store.select(
      (state) => state.global.isShowNotification
    );

    this.notificationText$ = this.store.select(
      (state) => state.global.notificationText
    );

    this.notificationIcon$ = this.store.select(
      (state) => state.global.notificationIcon
    );
  }
}
