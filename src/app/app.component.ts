import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCGXfJANiDtZCxnAsFcR-Xpfw5uP-tKfuU',
      authDomain: 'ng-recipe-book-91525.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-91525.firebaseio.com',
      projectId: 'ng-recipe-book-91525',
      storageBucket: 'ng-recipe-book-91525.appspot.com',
      messagingSenderId: '1044062101086'
    });
    this.authService.initialize();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
