import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/index.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'anuglar-e96e9',
        appId: '1:422820374401:web:22a3454ea2168a6196ea80',
        storageBucket: 'anuglar-e96e9.appspot.com',
        apiKey: 'AIzaSyDGvPLDNE3FwCeK9e1fo_DHmHo6jBQlNwI',
        authDomain: 'anuglar-e96e9.firebaseapp.com',
        messagingSenderId: '422820374401',
      },
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'anuglar-e96e9',
        appId: '1:422820374401:web:22a3454ea2168a6196ea80',
        storageBucket: 'anuglar-e96e9.appspot.com',
        apiKey: 'AIzaSyDGvPLDNE3FwCeK9e1fo_DHmHo6jBQlNwI',
        authDomain: 'anuglar-e96e9.firebaseapp.com',
        messagingSenderId: '422820374401',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore(reducers),
  ],
};
