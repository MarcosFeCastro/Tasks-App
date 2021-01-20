import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
})
export class ListAllComponent implements OnInit {

  private projects: any = null
  private isLoading: boolean = false
  private system_msg: string = null

  private primaryFilter: string = 'group'
  private secundaryFilter: string = 'all'
  
  constructor( private projectService: ProjectService, private router: Router ) { }

  showMenu() {
    let task = document.getElementById('fab-menu')
    let overlay = document.getElementById('overlay')
    let icon = document.getElementById('menu-icon')
    if( task.style.maxHeight == '' || task.style.maxHeight == '0px' ) {
      //task.style.opacity = '1';
      task.style.maxHeight = '200px';
      //overlay.style.display = "block";
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      icon.setAttribute('name', 'close-outline');
    } else {
      task.style.maxHeight = '0px';
      //overlay.style.display = "none";
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      icon.setAttribute('name', 'add');
    }
  }

  closeMenu() {
    document.getElementById('fab-menu').style.maxHeight = '0px';
    //document.getElementById("overlay").style.display = "none";
    document.getElementById('overlay').style.visibility = 'hidden';
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('menu-icon').setAttribute('name', 'add');
  }

  reloadProjects( event ) {
    this.loadProjects( this.setPrimaryFilter, this.secundaryFilter )
    setTimeout( () => { event.target.complete() }, 1000 )
  }

  loadProjects( status, filter ) {
    this.closeMenu()
    this.projects = null
    this.isLoading = true
    this.system_msg = null
    this.projectService.findAll( status, filter ).subscribe( async response => { await this.delay( 500 )
      this.isLoading = false
      if( response ) { this.projects = response
      } else { this.system_msg = "Nenhum projeto encontrado" }
    }, error => { console.error( error )
      this.system_msg = "Não foi possível carregar!"
    } )
  }

  openProject( id ) {
    this.showMenu()
    this.router.ngOnDestroy()
    this.router.navigate( [ 'project/details', id.toString() ], { replaceUrl: true } )
  }

  goToPage( url: string ) {
    this.showMenu()
    this.router.ngOnDestroy()
    this.router.navigate( [`${ url }`], { replaceUrl: true } )
  }

  setPrimaryFilter( filter ) {
    this.primaryFilter = filter
    this.loadProjects( filter, this.secundaryFilter )
  }

  setSecundaryFilter( status ) {
    this.secundaryFilter = status
    this.loadProjects( this.primaryFilter, status )
  }

  delay( ms: number ) { return new Promise( resolve => setTimeout( resolve, ms ) ) }

  ngOnInit() {
    this.loadProjects( null, null )
  }

}
