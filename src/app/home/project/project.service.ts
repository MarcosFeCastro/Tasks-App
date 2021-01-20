import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from 'src/app/models/project';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) { }

  findById( id ) : Observable<Project> {
    return this.http.get<Project>( `${ environment.api_url }project/${ id }` )
  }

  findDetailsById( id ) : Observable<Project> {
    return this.http.get<Project>( `${ environment.api_url }project/details/${ id }` )
  }

  findAll( filter, status ) : Observable<any[]> {
    return this.http.get<any[]>( `${ environment.api_url }projects/${ filter }/${ status }` )
  }

  findAllTest() {
    return this.http.get( `${ environment.api_url }projects`, {
      observe: 'response', responseType: 'text'
    } )
  }

  create( project: Project ) {
    return this.http.post( `${ environment.api_url }project`, project, {
      observe: 'response', responseType: 'text'
    } )
  }

  update( project: Project ) {
    return this.http.put( `${ environment.api_url }project`, project, {
      observe: 'response', responseType: 'text'
    } )
  }

  updateStatus( status: any ) {
    return this.http.put( `${ environment.api_url }project/status`, status, {
      observe: 'response', responseType: 'text'
    } )
  }

  delete( id ) {
    return this.http.delete( `${ environment.api_url }project/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

  // STAFF

  insertUser( user ) {
    return this.http.post( `${ environment.api_url }project/staff`, user, {
      observe: 'response', responseType: 'text'
    } )
  }

  deleteUser( project_id, user_id ) {
    return this.http.delete( `${ environment.api_url }project/${ project_id }/staff/${ user_id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

  findStaff( projectId ) : Observable<any[]> {
    return this.http.get<any[]>( `${ environment.api_url }project/${ projectId }/staff` )
  }

}
