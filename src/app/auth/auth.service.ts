import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

import { LocalUser } from '../models/local_user';

import { User } from '../models/user';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private storage: StorageService ) { }

  autenticate( credentials: { username: string, password: string } ) {
    return this.http.post( `${ environment.api_url }auth`, credentials, {
      observe: 'response', responseType: 'text'
    } );
  }

  register( user: User ) {
    return this.http.post( `${ environment.api_url }auth/register`, user, {
      observe: 'response', responseType: 'text'
    } );
  }

  login( bearerToken: string ) {
    let token = bearerToken.substring(7)
    let user: LocalUser = { token: bearerToken, username: jwt_decode( token )['username'] }
    this.storage.setLocalUser( user )
  }

  isLogged() {
    return this.storage.getLocalUser() ? true : false
  }

  logout() {
    this.storage.setLocalUser( null )
  }

  test() : Observable<any[]> {
    return this.http.get<any[]>( `${environment.api_url}/evaluation` )
  }

}
