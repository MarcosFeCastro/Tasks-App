import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = null

  constructor( private storageService: StorageService, private router: Router, private menu: MenuController ) { }

  ngOnInit() {
    this.username = this.storageService.getLocalUser()['username']
  }

  ngOnDestroy() {
    this.username = null
  }

  openMenu() {
    this.menu.open('start')
    this.menu.open('end')
  }

  closeMenu() {
    this.menu.close('start')
    this.menu.close('end')
  }

  goToPage( url: string ) {
    this.closeMenu()
    this.router.navigate( [ `${url}` ], { replaceUrl: true } )
  }

  logout() {
    this.storageService.setLocalUser( null )
    this.goToPage( 'auth/login' )
  }

}
