import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {HttpEvent} from '@angular/common/http';

import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;
   constructor(private route: ActivatedRoute,
               private router: Router,
               private dataStorageService: DataStorageService,
               private store: Store<fromApp.AppState>) {}
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
     this.store.dispatch(new AuthActions.LogOut());
     this.router.navigate(['/']);
    }
}
