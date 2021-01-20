import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { UserTaskService } from '../task/user-task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  private tasks: any = null
  private requests: any = null
  private staff: any = null
  
  private isLoading: boolean = false
  private system_msg: string = null
  private response_msg: string = null

  constructor( private router: Router, private userService: UserService, private userTaskService: UserTaskService ) { }

  goToPage( url: string ) { this.router.navigate( [ url ], { replaceUrl: true } ) }

  // UNUSED
  answerRequest( id, answer ) {
    console.log( id )
    if( answer ) {
      this.userService.confirmRequest( id ).subscribe( response => {
        console.log( response )
        this.showMessage( 'Pedido aceito' )
      }, error => {
        console.error( error )
      } )
    } else {
      this.userService.refuseRequest( id ).subscribe( response => {
        console.log( response )
        this.showMessage( 'Pedido recusado' )
      }, error => {
        console.error( error )
      } )
    }
    this.loadRequests()
  }

  // UNUSED
  loadRequests() {
    this.userService.contactsRequests().subscribe( response => {
      console.log( response )
      this.requests = null
      if ( response ) { this.requests = response }
    }, error => {
      console.error( error )
    } )
  }

  // UNUSED
  loadTasks() {
    let date = new Date()
    this.userTaskService.findAllByDeadline( date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() ).subscribe( response => {
      console.log( response )
      this.tasks = null
      if ( response ) { this.tasks = response }
    }, error => {
      console.error( error )
    } )
  }

  async showMessage( msg ) {
    this.response_msg = msg
    await this.delay( 3500 )
    this.response_msg = null
  }

  delay( ms: number ) { return new Promise( resolve => setTimeout( resolve, ms ) ) }

  ngOnInit() {
    this.userService.homePageRequest().subscribe( response => {
      if ( response ) {
        this.requests = response['contacts'] || null
        this.tasks = response['tasks'] || null
        this.staff = response['staff'] || null
      }
    }, error => {
      console.error( error )
    } )
  }

}
