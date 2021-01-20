import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  constructor( private http: HttpClient ) { }

  findById( id ) : Observable<Task> {
    return this.http.get<Task>( `${ environment.api_url }user/task/${ id }` )
  }

  findDetailsById( id ) : Observable<any> {
    return this.http.get<any>( `${ environment.api_url }user/task/details/${ id }` )
  }

  findAll( status ) : Observable<Task[]> {
    return this.http.get<Task[]>( `${ environment.api_url }user/tasks/${ status }` )
  }

  findAllByDeadline( deadline ) : Observable<any[]> {
    return this.http.get<any[]>( `${ environment.api_url }user/tasks/deadline/${ deadline }` )
  }

  create( task: Task ) {
    return this.http.post( `${ environment.api_url }user/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  update( task: Task ) {
    return this.http.put( `${ environment.api_url }user/task`, task, {
      observe: 'response', responseType: 'text'
    } )
  }

  updateStatus( status: any ) {
    return this.http.put( `${ environment.api_url }user/task/status`, status, {
      observe: 'response', responseType: 'text'
    } )
  }

  delete( id ) {
    return this.http.delete( `${ environment.api_url }user/task/${ id }`, {
      observe: 'response', responseType: 'text'
    } )
  }
  
  // COMMENTS

  createUserTaskComment( message: any ) {
    return this.http.post( `${ environment.api_url }user/task/${ message.task_id }/comment`, message, {
      observe: 'response', responseType: 'text'
    } )
  }

  

}
