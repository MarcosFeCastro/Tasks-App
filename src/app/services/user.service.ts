import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  contactList() : Observable<any> {
    return this.http.get<any>( `${ environment.api_url }user/contacts` )
  }

  getMyProfile() : Observable<any> {
    return this.http.get<any>( `${ environment.api_url }user/profile` )
  }

  getProfile( id ) : Observable<any> {
    return this.http.get<any>( `${ environment.api_url }user/profile/${ id }` )
  }

  findByUsername( username ) : Observable<any> {
    return this.http.get<any>( `${ environment.api_url }user/find/${ username }` )
  }

  create( user: any ) {
    return this.http.post( `${ environment.api_url }auth/register`, user, {
      observe: 'response', responseType: 'text'
    } )
  }

  update( user: any ) {
    return this.http.put( `${ environment.api_url }user`, user, {
      observe: 'response', responseType: 'text'
    } )
  }

  homePageRequest() { // Lista de pedidos de contatos
    return this.http.get<any[]>( `${ environment.api_url }user/homepage` )
  }

  contactsRequests() { // Lista de pedidos de contatos
    return this.http.get<any[]>( `${ environment.api_url }user/contact/requests` )
  }

  confirmRequest( id ) {// Recusar pedidos de contatos
    return this.http.put( `${ environment.api_url }user/contact/request/confirm/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

  refuseRequest( id ) {// Recusar pedidos de contatos
    return this.http.put( `${ environment.api_url }user/contact/request/refuse/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

  delete( id ) {
    return this.http.delete( `${ environment.api_url }project/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

}
