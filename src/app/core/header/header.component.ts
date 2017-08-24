import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';


@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response ) => console.log('Recipes Saved!'),
        (error) => console.log('Error Saving Recipes!')
      );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }
  onLogout() {
    this.authService.signoutUser();
  }

  isAuthenticated() {
    this.authService.isAuthenticated();
  }

}
