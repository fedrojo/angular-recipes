import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {



  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()

  constructor (private http: Http) {}

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(this.getIngredients());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.getIngredients());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.getIngredients());
  }

  setIngredients(data: Ingredient[]) {
    this.ingredients = data;
    this.ingredientChange.next(this.getIngredients());

  }


}
