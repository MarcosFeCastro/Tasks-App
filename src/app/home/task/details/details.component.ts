import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserTaskService } from '../user-task.service';
import { TaskService } from '../task.service';
import { ProjectService } from '../../project/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';

//import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  private taskId: string = null
  private taskIdSubscription: Subscription
  private task: Task

  private users: any = null
  private selectedUsers = []

  private projectId: string = null
  private projectIdSubscription: Subscription

  formMessage: FormGroup
  formMessageSubmitted: boolean = false

  private isLoading: boolean = false
  private contact_msg: string = null
  private system_msg: string = null

  constructor( private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private userTaskService: UserTaskService, private taskService: TaskService, private projectService: ProjectService ) { }

  goToPage( url ) { this.router.navigate( [ url ], { replaceUrl: true } ) }

  closePage() {
    if( this.projectId ) {
      this.router.navigate( [ 'project/details', this.projectId ], { replaceUrl: true } )
    } else {
      this.router.navigate( [ 'task' ], { replaceUrl: true } )
    }
  }

  hasErrorForm( field: string ) { return this.formMessage.get( field ).errors }

  showFormMessage() {
    this.closeMenu()
    let msg = document.getElementById('form-message')
    let overlay = document.getElementById('overlay')
    if( msg.style.maxHeight == '' || msg.style.maxHeight == '0px' ) {
      msg.style.maxHeight = '320px';
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
    } else {
      msg.style.maxHeight = '0px';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  closeFormMessage() {
    document.getElementById('form-message').style.maxHeight = '0px';
    document.getElementById('overlay').style.visibility = 'hidden';
    document.getElementById('overlay').style.opacity = '0';
    this.formMessage.reset()
    this.formMessageSubmitted = false
  }

  presentStatusAlert() {
    this.closeMenu()
    let status = document.getElementById('status-alert')
    let overlay = document.getElementById('overlay')
    if( status.style.visibility == '' || status.style.visibility == 'hidden' ) {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      status.style.visibility = 'visible';
      status.style.opacity = '1';
    } else {
      status.style.visibility = 'hidden';
      status.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  setStatus( status ) {
    if( this.projectId ) {
      let statusData = { id: this.taskId, project_id: this.projectId, status: status }
      this.taskService.updateStatus( statusData ).subscribe( response => {
        if( response ) {
          this.closeMenu()
          this.task.status = status
        }
        this.closeAlerts()
      }, error => {
        console.error( error )
      } )
    } else {
      let statusData = { id: this.taskId, status: status }
      this.userTaskService.updateStatus( statusData ).subscribe( response => {
        if( response ) {
          this.closeMenu()
          this.task.status = status
        }
        this.closeAlerts()
      }, error => {
        console.error( error )
      } )
    }
  }

  presentDeleteAlert() {
    this.closeMenu()
    let del = document.getElementById('delete-alert')
    let overlay = document.getElementById('overlay')
    if( del.style.visibility == '' || del.style.visibility == 'hidden' ) {
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      del.style.visibility = 'visible';
      del.style.opacity = '1';
    } else {
      del.style.visibility = 'hidden';
      del.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
    }
  }

  deleteProject( id ) {

    if ( this.projectId ) {
      this.taskService.delete( id ).subscribe( response => {
        this.presentDeleteAlert()
        if( response.status == 200 ) {
          this.router.ngOnDestroy()
          this.router.navigate( ['project'], { replaceUrl: true } )
        }
      }, error => {
        console.error( error )
      } )
    } else {
      this.userTaskService.delete( id ).subscribe( response => {
        this.presentDeleteAlert()
        if( response.status == 200 ) {
          this.router.ngOnDestroy()
          this.router.navigate( ['project'], { replaceUrl: true } )
        }
      }, error => {
        console.error( error )
      } )
    }

  }

  closeAlerts() {
    let status = document.getElementById('status-alert')
    let del = document.getElementById('delete-alert')
    let overlay = document.getElementById('overlay')
    status.style.visibility = 'hidden';
    status.style.opacity = '0';
    del.style.visibility = 'hidden';
    del.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    document.getElementById('form-message').style.maxHeight = '0px';
    this.formMessage.reset()
    this.formMessageSubmitted = false
  }

  submmit(){
    this.formMessageSubmitted = true
    if( this.formMessage.valid ) {
      let data = { message: this.formMessage.get('message').value, task_id: this.taskId }
      if( this.projectId ) {
        this.taskService.createTaskComment( data ).subscribe( response => {

          console.log( response )
          this.loadTask()
          this.closeFormMessage()

        }, error => {
          console.error( error )
        } )
      } else {
        this.userTaskService.createUserTaskComment( data ).subscribe( response => {

          console.log( response )
          this.loadTask()
          this.closeFormMessage()
          
        }, error => {
          console.error( error )
        } )
      } // if( this.projectId ) else
    } // if( this.formMessage.valid )
  }

  showMenu() {
    let task = document.getElementById('fab-menu')
    let overlay = document.getElementById('overlay2')
    let icon = document.getElementById('menu-icon')
    if( task.style.maxHeight == '' || task.style.maxHeight == '0px' ) {
      task.style.maxHeight = '320px';
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
    //document.getElementById("overlay").style.display = "none";
    document.getElementById('overlay2').style.visibility = 'hidden';
    document.getElementById('overlay2').style.opacity = '0';
    document.getElementById('menu-icon').setAttribute('name', 'add');
  }

  selectUser( user ) {

    this.selectedUsers.push( user )

    console.log( this.selectedUsers )
    
  }

  showUsers() {
    if( this.users == null ) { this.findUsers() }
    let list = document.getElementById('list-contacts')
    if( list.style.height == '' || list.style.height == '0px' ) {
      list.style.height = '80%'
    } else {
      this.users = null
      list.style.height = '0px'
    }
  }

  findUsers() {
    this.closeMenu()
    if( this.projectId ) {
      // BUSCAR MEMBROS DO PROJETO
      this.projectService.findStaff( this.projectId ).subscribe( response => {
        if( response ) {
          this.users = response
        } else {
          this.contact_msg = "Nenhum usuário encontrado"
        }
      }, error => {
        this.isLoading = false
        this.contact_msg = "Não foi possível carregar!"
        console.error( error )
      } )
    } else {
      // BUSCAR CONTATOS DO USUÁRIO
      /**
        this.contactService.getContactList().subscribe( response => {
          if( response ) {
            this.users = response
          } else {
            this.contact_msg = "Nenhum usuário encontrado"
          }
        }, error => {
          this.isLoading = false
          this.contact_msg = "Não foi possível carregar!"
          console.error( error )
        } )
      */
    }
  }

  loadTask() {
    this.closeMenu()
    this.isLoading = true
    if ( this.projectId ) {
      this.taskService.findDetailsById( this.taskId ).subscribe( response => {
        this.isLoading = false
        if ( response ) { this.task = response
        } else { this.system_msg = "Tarefa não encontrada" }
      }, error => { console.error( error )
        this.isLoading = false
        this.router.navigate( ['/project'], { replaceUrl: true } )
      } )
    } else {
      this.userTaskService.findDetailsById( this.taskId ).subscribe( response => {
        this.isLoading = false
        if ( response ) { this.task = response
        } else { this.system_msg = "Tarefa não encontrada" }
        console.log( this.task )
      }, error => { console.error( error )
        this.isLoading = false
        this.router.navigate( ['/project'], { replaceUrl: true } )
      } )
    }
  }

  ngOnInit() {
    this.formMessage = this.formBuilder.group( {
      message: [ null, [ Validators.required, Validators.minLength(1) ] ]
    } )
    this.taskIdSubscription = this.route.params.subscribe( ( params: any ) => { this.taskId = params['taskid'] } )
    this.projectIdSubscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    this.loadTask()
  }

  ngOnDestroy() {
    this.taskIdSubscription.unsubscribe()
    this.projectIdSubscription.unsubscribe()
  }

}
