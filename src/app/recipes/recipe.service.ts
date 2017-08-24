import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipesURL = 'https://ng-recipe-book-91525.firebaseio.com/recipes.json';

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a test',
      'http://www.vegrecipesofindia.com/wp-content/uploads/2016/12/pressure-cooker-chocolate-cake-recipe.jpg',
      [
        new Ingredient('Potatoes', 20),
        new Ingredient('Pasta', 12)
      ]
    ),
    new Recipe(
      'Another Test Recipe',
      'Another Test',
      'https://static01.nyt.com/images/2014/05/14/dining/14REDVELVET/14REDVELVET-superJumbo-v4.jpg',
      [
        new Ingredient('Tomatoes', 120),
        new Ingredient('Carrots', 123),
        new Ingredient('Banana', 1),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipies(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());

  }


}
