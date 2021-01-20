import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  private users: any = null

  private isLoading: boolean = false
  private system_msg: string = null

  searchForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private router: Router, private contactService: ContactService ) { }

  goToPage( url ) {
    this.router.navigate( [ url ], { replaceUrl: true } )
  }

  visitProfile( url ) {
    this.router.navigate( [ url ] )
  }

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

  searchUser() {
    this.system_msg = null
    this.users = null
    if( this.searchForm.valid ) {
      let username = this.searchForm.get('username').value
      this.contactService.getContactListByUsername( username ).subscribe( response => {
        if( response ) {
          this.users = response
          console.log( this.users )
        } else {
          this.system_msg = "Nenhum contato"
        }
      }, error => {
        this.isLoading = false
        this.system_msg = "Não foi possível carregar"
        console.error( error )
      } )
    }
  }

  ngOnInit() {
    this.system_msg = 'Busque por usuários'
    this.searchForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]]
    })
  }

}
