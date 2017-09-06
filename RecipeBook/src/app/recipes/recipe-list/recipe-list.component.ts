import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'Test Description', 'http://images.indianexpress.com/2015/05/macaroni-main.jpg'),
    new Recipe('Test Recipe', 'Test Description', 'http://images.indianexpress.com/2015/05/macaroni-main.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
