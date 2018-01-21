import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {HttpEvent} from '@angular/common/http';

import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;
   constructor(private route: ActivatedRoute,
               private router: Router,
               private dataStorageService: DataStorageService,
               public authService: AuthService,
               private store: Store<fromApp.AppState>) {}

    onSelect(feature: string) {
        // this.router.navigate(['/',feature])
    }
    ngOnInit() {
      this.authState = this.store.select('auth');
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
