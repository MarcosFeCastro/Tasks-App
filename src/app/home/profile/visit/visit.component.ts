import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';
import { ContactService } from '../../contact/contact.service';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {

  private user: any = null

  private userId = null
  private userIdSubscription: Subscription

  private projectId = null
  private projectIdSubscription: Subscription

  private isRequested: boolean = false

  private isLoading: boolean = false
  private system_msg: string = null

  constructor( private route: ActivatedRoute, private router: Router, private userService: UserService, private contactService: ContactService, private projectService: ProjectService ) { }

  goToPage( url ) { this.router.navigate( [ url ], { replaceUrl: true } ) }

  addUser( id ) {
    //console.log( id )
    this.contactService.addContact( id ).subscribe( response => {
      //console.log( response )
      if ( response['status'] == 201 ) {
        console.log( "Usuário adicionado com sucesso" )
        this.isRequested = true
      }
    }, error => { //console.log( error )
      this.system_msg = "Não foi possível adicionar o usuário"
      if ( error['status'] == 422 ) { this.isRequested = true }
    } )
  }

  closeProfile() {
    if( this.projectId ) { this.router.navigate( [ '/project/details/', this.projectId ], { replaceUrl: true } )
    } else { this.router.navigate( [ '/contact/add' ], { replaceUrl: true } ) }
  }

  deleteContact( id ){
    console.log( id )
    this.contactService.delete( id ).subscribe( response => {
      console.log( response )
      this.loadProfile()
    }, error => {
      this.system_msg = "Não foi possível remover o usuário"
      console.log( error )
    } )
  }

  deleteStaff( id ){
    console.log( id )
    this.projectService.deleteUser( this.projectId, id ).subscribe( response => {
      console.log( response )
      this.goToPage( '/project/details/' + this.projectId )
    }, error => {
      this.system_msg = "Não foi possível remover o usuário do projeto"
      console.log( error )
    } )
  }

  loadProfile() {
    this.userService.getProfile( this.userId ).subscribe( response => {
      console.log( response )
      this.user = response
    }, error => {
      console.error( error )
    } )
  }

  ngOnInit() {
    this.userIdSubscription = this.route.params.subscribe( ( params: any ) => { this.userId = params['userid'] } )
    this.projectIdSubscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    this.loadProfile()
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe()
    this.projectIdSubscription.unsubscribe()
  }

}
