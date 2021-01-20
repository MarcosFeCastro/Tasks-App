import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { ContactService } from '../../contact/contact.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {

  private user: any = null

  private userId = null
  private userIdSubscription: Subscription

  private projectId = null
  private projectIdSubscription: Subscription

  private isLoading: boolean = false
  private system_msg: string = null

  constructor( private route: ActivatedRoute, private router: Router, private userService: UserService, private contactService: ContactService ) { }

  goToPage( url ) { this.router.navigate( [ url ], { replaceUrl: true } ) }

  addUser( id ) {
    console.log( id )
    this.contactService.addContact( id ).subscribe( response => {
      console.log( response )
      if ( response['id'] ) {
        console.log( "Usuário adicionado com sucesso" )
      }
    }, error => {
      this.system_msg = "Não foi possível adicionar o usuário"
      console.log( error )
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
      if ( response['id'] ) {
        console.log( "Usuário adicionado com sucesso" )
      }
    }, error => {
      this.system_msg = "Não foi possível adicionar o usuário"
      console.log( error )
    } )
  }

  ngOnInit() {
    this.userIdSubscription = this.route.params.subscribe( ( params: any ) => { this.userId = params['userid'] } )
    this.projectIdSubscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    
    this.userService.getProfile( this.userId ).subscribe( response => {

      console.log( response )
      this.user = response

    }, error => {
      console.error( error )
    } )

  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe()
    this.projectIdSubscription.unsubscribe()
  }

}
