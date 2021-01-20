import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Project } from 'src/app/models/project';

import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  private projectId: string = null
  private projectIdSubscription: Subscription;

  form: FormGroup;

  formSubmitted: boolean = false;

  constructor( private formBuilder: FormBuilder, private projectService: ProjectService, public toastController: ToastController, private router: Router, private route: ActivatedRoute ) { }

  hasErrorForm( field: string ) {
    return this.form.get( field ).errors
  }

  cancel() {
    this.router.ngOnDestroy()
    if( this.projectId ) {
      this.router.navigate( ['project/details/', this.projectId], { replaceUrl: true } )
    } else {
      this.router.navigate( ['project'], { replaceUrl: true } )
    }
    //this.form.reset()
    //this.formSubmitted = false
  }

  submmit(){
    this.formSubmitted = true
    if( this.form.valid ) {
      //this.loginLoading = true;
      //this.invalidLogin = false;
      let data = { id: this.form.get('id').value, name: this.form.get('name').value, description: this.form.get('description').value || null, deadline: this.form.get('deadline').value || null }
      if ( this.projectId ) {
        this.projectService.update( data ).subscribe( response => {
          console.log( response )
          if ( response.status == 200 ) {
            this.form.reset()
            this.formSubmitted = false
            this.router.navigate( [ 'project/details/', this.projectId ] )
          } else {
            this.formSubmitted = false
          }
        }, error => {
          console.error( error )
          this.formSubmitted = false
          this.presentToast('Tente novamente', 'danger')
        } ) //projectService.update
      } else {
        this.projectService.create( data ).subscribe( response => {
          if ( response.status == 201 ) {
            this.form.reset()
            this.formSubmitted = false
            this.router.navigate( [ '/project/details/', JSON.parse( response.body).id ] )
          } else {
            this.form.reset()
            this.formSubmitted = false
          }
        }, error => {
          this.form.reset()
          this.formSubmitted = false
          this.presentToast('Tente novamente', 'danger')
        } ) //projectService.create
      } //if else
    } //if
  }

  cleanDeadline() {
    this.form.reset('deadline')
  }

  async presentToast( message: string, color: string ) {
    const toast = await this.toastController.create({
      message: message, duration: 6000, color: color, animated: true, position: 'middle'
    });
    toast.present();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required, Validators.minLength(1) ] ],
      //status: [ 0, [ Validators.required ] ],
      description: [ null ],
      deadline: [ null ]
    })
    this.projectIdSubscription = this.route.params.subscribe( ( params: any ) => { this.projectId = params['projectid'] } )
    if( this.projectId ) {
      this.projectService.findById( this.projectId ).subscribe( response => {
        this.form.setValue( {
          id: response.id, name: response.name, description: response.description, deadline: response.deadline ? response.deadline.toString() : null
        } )
      }, error => {
        console.error( error )
      } )
    }
  }

  ngOnDestroy() {
    this.projectIdSubscription.unsubscribe()
    this.formSubmitted = false
    this.form.reset()
  }

}
