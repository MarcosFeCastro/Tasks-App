import { Component, OnInit } from '@angular/core';

import { GroupService } from '../group.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
})
export class ListAllComponent implements OnInit {

  private groups: Group[] = null
  
  private isLoading: boolean = false
  private system_msg: string = null

  constructor( private groupService: GroupService ) { }

  showMenu() {
    let task = document.getElementById('fab-menu')
    let overlay = document.getElementById('overlay')
    let icon = document.getElementById('menu-icon')
    if( task.style.maxHeight == '' || task.style.maxHeight == '0px' ) {
      task.style.maxHeight = '200px';
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      icon.setAttribute('name', 'close-outline');
    } else {
      task.style.maxHeight = '0px';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      icon.setAttribute('name', 'add');
    }
  }

  closeMenu() {
    document.getElementById('fab-menu').style.maxHeight = '0px';
    document.getElementById('overlay').style.visibility = 'hidden';
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('menu-icon').setAttribute('name', 'add');
  }

  loadTasks( status ) {
    this.closeMenu()
    this.system_msg = null
    this.isLoading = true
    this.groups = null
    this.groupService.findAll( status ).subscribe( async response => {
      this.isLoading = false
      if( response ) {
        this.groups = response;
      } else {
        this.system_msg = "Nenhuma tarefa encontrada"
      }
    }, error => { console.error( error )
      this.isLoading = false
      this.system_msg = "Não foi possível carregar!"
    } )
  }

  ngOnInit() {}

}
