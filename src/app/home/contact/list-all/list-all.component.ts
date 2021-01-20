import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../contact.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
})
export class ListAllComponent implements OnInit {

  private contacts: any[] = null

  private users: any = null
  
  private isLoading: boolean = false
  private system_msg: string = null
  
  searchForm: FormGroup;
  
  constructor( private formBuilder: FormBuilder, private router: Router, private contactService: ContactService ) { }

  goToPage( url ) {
    this.router.navigate( [ url ], { replaceUrl: true } )
  }

  searchUser() {
    this.users = null
    if( this.searchForm.valid ) {
      let username = this.searchForm.get('username').value
      this.contactService.getContactListByUsername( username ).subscribe( response => {
        if( response ) {
          this.users = response
        } else {
          this.system_msg = "Nenhum contato"
        }
      }, error => {
        this.isLoading = false
        this.system_msg = "Não foi possível carregar!"
        console.error( error )
      } )
    }
  }

  loadContacts() {
    this.system_msg = null
    this.isLoading = true
    this.contactService.getContactList().subscribe( response => {
      this.isLoading = false
      if( response ) {
        this.contacts = response
        console.log( this.contacts )
      } else {
        this.system_msg = "Nenhum contato"
      }
    }, error => {
      this.isLoading = false
      this.system_msg = "Não foi possível carregar!"
      console.error( error )
    } )
  }

  ngOnInit() {
    this.loadContacts()
    this.searchForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]]
    })
  }

}
