import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http: HttpClient ) { }

  findById( id ) : Observable<Group> {
    return this.http.get<Group>( `${ environment.api_url }project/task/${ id }` )
  }

  findAll( status ) : Observable<Group[]> {
    return this.http.get<Group[]>( `${ environment.api_url }project/tasks/${ status }` )
  }

  create( task: Group ) {
    return this.http.post( `${ environment.api_url }project/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  update( task: Group ) {
    return this.http.put( `${ environment.api_url }project/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  delete( id ) {
    return this.http.delete( `${ environment.api_url }project/task/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

}
