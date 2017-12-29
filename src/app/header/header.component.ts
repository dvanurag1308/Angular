import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

   constructor(private route: ActivatedRoute, private router: Router, private dataStorageService: DataStorageService) {}

    onSelect(feature: string) {
        // this.router.navigate(['/',feature])
    }

    onSave() {
     this.dataStorageService.storeRecipes()
       .subscribe((response: Response) => {
       console.log(response);
       });
    }

    onFetch() {
     this.dataStorageService.fetchRecipes();
    }
}
