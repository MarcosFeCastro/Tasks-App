import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor( private storageService: StorageService, private router: Router ) { }

  ngOnInit() {
    if( this.storageService.getLocalUser() ) {
      this.router.navigate( ['home'] )
    }
  }

}
