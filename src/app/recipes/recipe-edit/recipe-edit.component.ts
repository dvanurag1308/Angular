import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.id = +params['id'];
      }
      this.initForm();
    });
  }

  private initForm() {
     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required]),
              'quantity': new FormControl(ingredient.quantity, [Validators.required, Validators.pattern('^[1-9]+[0-9]*')])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    const newIngredient = new FormGroup({
      'name': new FormControl(null),
      'quantity': new FormControl(null)
    });

    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredient);
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
