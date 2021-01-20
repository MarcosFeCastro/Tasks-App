import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private storageService: StorageService, private authService: AuthService, private router: Router ) { }
  
  canActivate(): Promise<boolean> {
    return new Promise( resolve => {
      if ( !this.storageService.getLocalUser() ) {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      } else {
        //return true
        //resolve(user ? true : false)
        resolve( true )
        /**
          try {
            this.authService.refreshToken().subscribe( user => {
              if ( !user ) {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
              }
              resolve( user ? true : false );
            });
          } catch (error) {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
        */
      }
    });
  }
  
}
