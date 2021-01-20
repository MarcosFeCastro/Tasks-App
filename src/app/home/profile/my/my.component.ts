import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss'],
})
export class MyComponent implements OnInit {

  private user: any = null

  constructor( private router: Router, private storageService: StorageService, private userService: UserService ) { }

  goToPage( url ) { this.router.navigate( [`${ url }`], { replaceUrl: true } ) }

  logout() {
    this.storageService.setLocalUser( null )
    this.goToPage( 'auth/login' )
  }

  ngOnInit() {
    this.userService.getMyProfile().subscribe( response => {

      console.log( response )
      this.user = response

    }, error => {
      console.error( error )
    } )
  }

}
