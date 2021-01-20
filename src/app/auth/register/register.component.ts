import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  formSubmitted: boolean = false;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) { }

  goToPage( url ) { this.router.navigate( [`${ url }`], { replaceUrl: true } ) }

  hasErrorLogin( field: string ) {
    return this.registerForm.get( field ).errors
  }

  register(){
    this.formSubmitted = true
    if ( this.registerForm.get('confpassword').value != this.registerForm.get('password').value ) {
      this.registerForm.controls['confpassword'].setErrors( { 'incorrect': true } )
    } else {
      if( this.registerForm.valid ) {
        //this.loginLoading = true;
        //this.invalidLogin = false;
        let user = {
          username: this.registerForm.get('username').value, email: this.registerForm.get('email').value, firstName: this.registerForm.get('firstName').value, password: this.registerForm.get('password').value
        }
        this.authService.register( user ).subscribe( async response => {
          this.registerForm.reset()
          //this.formSubmitted = false

          console.log( response )

          if ( response.status == 200 ) {
            let body = JSON.parse( response.body )
            await this.authService.login( body['token'] )
            this.goToPage( '/home' )
          } else {
            console.log("ERROR")
          }
        }, error => { 
          this.registerForm.reset()
          //this.formSubmitted = false
          console.log( error )
          if ( error.status == 422 && error.error == 'username' ) {
            this.registerForm.controls['username'].setErrors( { 'incorrect': true } )
          }
          if ( error.status == 422 && error.error == 'email' ) {
            this.registerForm.controls['email'].setErrors( { 'incorrect': true } )
          }
          if( error.status == 401 ) {
            console.error( "Dados inválidos" )
          }
        } ) // error
      } // if( this.registerForm.valid )
    } // if else
  }

  ngOnInit() {
    if( this.authService.isLogged() ) { this.router.navigate( ['home'] ) }
    this.registerForm = this.formBuilder.group({
      username: [ null, [ Validators.required, Validators.minLength( 1 ), Validators.maxLength( 255 ) ] ],
      email: [ null, [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 255 ) ] ],
      firstName: [ null, [ Validators.required, Validators.minLength( 1 ), Validators.maxLength( 255 ) ] ],
      password: [ null, [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 255 ) ] ],
      confpassword: [ null, [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 255 ) ] ]
    })
  }

}
