import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserTaskService } from '../user-task.service';
import { Task } from 'src/app/models/task';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
})
export class ListAllComponent implements OnInit {

  private tasks: Task[] = null
  private todayTasks: Task[] = null
  private tomorrowTasks: Task[] = null

  private today: Date
  //private tomorrow: Date
  
  private isLoading: boolean = false
  private system_msg: string = null

  constructor( private router: Router, private userTaskService: UserTaskService ) { }

  goToPage( url: string ) {
    this.router.ngOnDestroy()
    this.router.navigate( [`${ url }`], { replaceUrl: true } )
  }

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

  reloadTasks( event ) {
    this.loadTasks( null )
    setTimeout( () => {
      event.target.complete()
    }, 1000 )
  }

  loadTasks( status ) {
    this.closeMenu()
    this.system_msg = null
    this.isLoading = true
    this.tasks = null; this.todayTasks = null; this.tomorrowTasks = null
    this.userTaskService.findAll( status ).subscribe( async response => {
      this.isLoading = false

      console.log( response )
 
      if( response ) {
        let today = []; let tomorrow = []; let others = []
        await response.forEach( task => {
          if( task.deadline != null ) {
            
            task.deadline = new Date( task.deadline + ' 00:00:00' )

            let date = new Date( task.deadline )

            if( ( task?.deadline.getFullYear() == this.today.getFullYear() ) && ( task?.deadline.getMonth() == this.today.getMonth() ) && ( task?.deadline.getDate() == this.today.getDate() ) ) {
              today.push( task )
            } else if ( ( task?.deadline.getFullYear() == this.today.getFullYear() ) && ( task?.deadline.getMonth() == this.today.getMonth() ) && ( task?.deadline.getDate() == this.today.getDate() + 1 ) ) {
              tomorrow.push( task )
            } else {
              others.push( task )
            }
          } else {
            others.push( task )
          }
        } )
        this.tasks = others; this.todayTasks = today; this.tomorrowTasks = tomorrow
      } else {
        this.system_msg = "Nenhuma tarefa encontrada"
      } // if( response ) else
    }, error => { console.error( error )
      this.isLoading = false
      this.system_msg = "Não foi possível carregar!"
    } )
  }

  ngOnInit() {
    //this.tomorrow = new Date( new Date().getTime() + 24 * 60 * 60 * 1000 )
    //let date = new Date()
    //this.today = new Date( date.getFullYear(), date.getMonth(), date.getDate() )
    this.today = new Date()

    console.log( this.today )
    
    this.loadTasks( 'inProgress' )
  }

  ngOnDestroy() {
    
  }

}
