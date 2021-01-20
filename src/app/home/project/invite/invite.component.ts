import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContactService } from '../../contact/contact.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {

  private projectId: string
  
  private users: any = null
  private contacts: any = null

  private isLoading: boolean = false
  private system_msg: string = null

  searchForm: FormGroup;

  searchFormSubmitted: boolean = false;
  error404: boolean = false;
  
  constructor( private route: ActivatedRoute, private router: Router, private contactService: ContactService, private projectService: ProjectService, private formBuilder: FormBuilder ) { }

  goToPage( url: string ) { this.router.navigate( [ url ], { replaceUrl: true } ) }

  visitProfile( url ) {
    this.router.navigate( [ url ] )
  }

  addUser( id ) {
    console.log( id )

    let data = { project_id: this.projectId, user_id: id, type: 'common' }

    console.log( data )

    this.projectService.insertUser( data ).subscribe( response => {

      console.log( response)
      this.goToPage( '/project/details/' + this.projectId )
      
    }, error => {
      console.error( error )
    } )
    
  }

  searchUser() {
    if( this.searchForm.valid ) {
      this.users = null
      this.system_msg = null
      let username = this.searchForm.get('username').value
      this.contactService.getContactListByUsername( username ).subscribe( response => {
        if( response ) {
          this.users = response
          console.log( this.users )
        } else {
          this.system_msg = "Nenhum usuário encontrado"
        }
      }, error => {
        this.isLoading = false
        this.system_msg = "Não foi possível carregar!"
        console.error( error )
      } )
    }
  }

  ngOnInit() {
    this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    this.contactService.getContactList().subscribe( response => {
      this.isLoading = false
      if( response ) { this.contacts = response
      } else { this.system_msg = "Busque por um usuário" }
    }, error => { console.error( error )
      this.isLoading = false
      this.system_msg = "Não foi possível carregar!"
    } )
    this.searchForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]]
    })
  }
  
}
