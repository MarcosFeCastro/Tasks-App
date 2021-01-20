import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserTaskService } from '../user-task.service';
import { TaskService } from '../task.service';
import { ProjectService } from '../../project/project.service';
import { ContactService } from '../../contact/contact.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  private taskId: string = null
  private taskIdSubscription: Subscription

  private projectId: string = null
  private projectIdSubscription: Subscription

  users: any[] = null
  selectedUsers = []

  form: FormGroup
  formSubmitted: boolean = false

  private isLoading: boolean = false
  private contact_msg: string = null

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userTaskService: UserTaskService, private taskService: TaskService, private projectService: ProjectService, private contactService: ContactService ) { }

  cancel() {
    if( this.projectId ) { this.router.navigate( [ '/project/' +  this.projectId + '/task/details/', this.taskId ], { replaceUrl: true } )
    } else { this.router.navigate( [ '/task' ], { replaceUrl: true } ) }
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
    }
  }

  selectUser( user ) {

    this.selectedUsers.push( user )

    console.log( this.selectedUsers )
    
  }

  cleanDeadline() { this.form.reset('deadline') }

  hasErrorForm( field: string ) { return this.form.get( field ).errors }

  submmit(){
    this.formSubmitted = true
    if( this.form.valid ) {
      
      let data = { id: this.form.get('id').value, name: this.form.get('name').value, description: this.form.get('description').value || null, deadline: this.form.get('deadline').value || null, project_id: this.projectId || null }

      if( this.projectId ) {

        if ( this.taskId ) {
        
          // ATUALIZAR TAREFA DE PROJETO
          this.taskService.update( data ).subscribe( response => {
            console.log( response )
            if ( response.status == 200 ) {
              this.form.reset()
              this.formSubmitted = false
              this.router.navigate( [ 'project/' + this.projectId + '/task/details/' + this.taskId ], { replaceUrl: true } )
            } else {
              this.formSubmitted = false
            }
          }, error => {
            console.error( error )
            this.formSubmitted = false
          } ) // taskService.update
  
        } else {
          
          // CADASTRAR TAREFA DE PROJETO
          this.taskService.create( data ).subscribe( response => {
            if ( response.status == 201 ) {
              this.form.reset()
              this.formSubmitted = false
              this.router.navigate( [ 'project/' + this.projectId + '/task/details/', JSON.parse( response.body).id ], { replaceUrl: true } )
            } else {
              this.form.reset()
              this.formSubmitted = false
            }
          }, error => {
            this.form.reset()
            this.formSubmitted = false
          } )
  
        }//if ( this.taskId )

      } else {

        if ( this.taskId ) {
        
          // ATUALIZAR TAREFA DE USUÁRIO
          this.userTaskService.update( data ).subscribe( response => {
            console.log( response )
            if ( response.status == 200 ) {
              this.form.reset()
              this.formSubmitted = false
              this.router.navigate( [ 'task/details/', this.taskId ], { replaceUrl: true } )
            } else {
              this.formSubmitted = false
            }
          }, error => {
            console.error( error )
            this.formSubmitted = false
          } ) // userTaskService.update
  
        } else {
          
          // CADASTRAR TAREFA DE USUÁRIO
          this.userTaskService.create( data ).subscribe( response => {
            if ( response.status == 201 ) {
              this.form.reset()
              this.formSubmitted = false
              this.router.navigate( [ '/task/details/', JSON.parse( response.body).id ], { replaceUrl: true } )
            } else {
              this.form.reset()
              this.formSubmitted = false
            }
          }, error => {
            this.form.reset()
            this.formSubmitted = false
          } ) // userTaskService.create
  
        }//if ( this.taskId ) else

      }//if( this.projectId ) else

    } //if this.form.valid
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required, Validators.minLength(1) ] ],
      description: [ null ],
      deadline: [ null ]
    })
    this.taskIdSubscription = this.route.params.subscribe( ( params: any ) => { this.taskId = params['taskid'] } )
    this.projectIdSubscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    if( this.taskId ) {
      // VERIFICA SE A TAREFA PERTENCE A UM PROJETO
      if ( this.projectId ) {
        // BUSCA TAREFA DE PROJETO
        this.taskService.findById( this.taskId ).subscribe( response => {
          this.form.setValue( {
            id: response.id, name: response.name, description: response.description, deadline: response.deadline ? response.deadline.toString() : null
          } )
        }, error => {
          console.error( error )
        } )
      } else {
        // BUSCA TAREFA
        this.userTaskService.findById( this.taskId ).subscribe( response => {
          this.form.setValue( {
            id: response.id, name: response.name, description: response.description, deadline: response.deadline ? response.deadline.toString() : null
          } )
        }, error => {
          console.error( error )
        } )
      }
    } //if( this.taskId )
  }

  ngOnDestroy() {
    this.taskIdSubscription.unsubscribe()
    this.projectIdSubscription.unsubscribe()
    this.formSubmitted = false
    this.form.reset()
  }

}
