import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient ) { }

  findById( id ) : Observable<Task> {
    return this.http.get<Task>( `${ environment.api_url }project/task/${ id }` )
  }

  findDetailsById( id ) : Observable<Task> {
    return this.http.get<Task>( `${ environment.api_url }project/task/details/${ id }` )
  }

  findAll( status ) : Observable<any[]> {
    return this.http.get<any[]>( `${ environment.api_url }project/tasks/${ status }` )
  }

  findAllByDeadline( deadline ) : Observable<any[]> {
    return this.http.get<any[]>( `${ environment.api_url }project/tasks/deadline/${ deadline }` )
  }

  create( task: Task ) {
    return this.http.post( `${ environment.api_url }project/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  update( task: Task ) {
    return this.http.put( `${ environment.api_url }project/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  updateStatus( status: any ) {
    return this.http.put( `${ environment.api_url }project/task/status`, status, {
      observe: 'response', responseType: 'text'
    } )
  }

  delete( id ) {
    return this.http.delete( `${ environment.api_url }project/task/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }

  // STAFF

  insertUser( user ) {
    return this.http.post( `${ environment.api_url }project/staff`, user, {
      observe: 'response', responseType: 'text'
    } )
  }

  // COMMENTS

  createTaskComment( message: any ) {
    return this.http.post( `${ environment.api_url }project/task/${ message.task_id }/comment`, message, {
      observe: 'response', responseType: 'text'
    } )
  }

}
