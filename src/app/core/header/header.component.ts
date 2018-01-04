import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {HttpEvent} from '@angular/common/http';

import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

   constructor(private route: ActivatedRoute,
               private router: Router,
               private dataStorageService: DataStorageService,
               public authService: AuthService) {}

    onSelect(feature: string) {
        // this.router.navigate(['/',feature])
    }

    onSave() {
     this.dataStorageService.storeRecipes()
       .subscribe((response) => {
       console.log(response);
       });
    }

    onFetch() {
     this.dataStorageService.fetchRecipes();
    }

    onLogout() {
     this.authService.logOut();
     this.router.navigate(['/']);
    }
}
