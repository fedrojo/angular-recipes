import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from './ingredient.model';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';


@Injectable()
export class DataStorageService {
  recipesURL = 'https://ng-recipe-book-91525.firebaseio.com/recipes.json';
  shoppingListURL = 'https://ng-recipe-book-91525.firebaseio.com/shoppingList.json';

  constructor(private http: Http,
              private recipesService: RecipeService,
              private slService: ShoppingListService,
              private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(
      this.recipesURL + '?auth=' + token,
      this.recipesService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    return this.http.get(this.recipesURL + '?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] =  response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe.ingredients  = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
        this.recipesService.setRecipies(recipes);
      });
  }


}
