import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginSubmitted: boolean = false;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, public toastController: ToastController, private router: Router ) { }

  goToPage( url ) { this.router.navigate( [`${ url }`], { replaceUrl: true } ) }

  hasErrorLogin( field: string ) {
    return this.loginForm.get( field ).errors
  }

  login(){
    this.loginSubmitted = true
    if( this.loginForm.valid ) {
      //this.loginLoading = true;
      //this.invalidLogin = false;
      try {
        let username = this.loginForm.get('username').value
        let password = this.loginForm.get('password').value
        this.authService.autenticate( { username, password } ).subscribe( async response => {
          this.loginForm.reset()
          this.loginSubmitted = false
          if ( response.status == 200 ) {
            let body = JSON.parse( response.body )
            await this.authService.login( body['token'] )
            this.router.navigate( ['/home'] )
          } else {
            console.log("ERROR")
          }
        }, error => { console.log( error )
          this.loginForm.reset()
          this.loginSubmitted = false
          if( error.status == 401 ) {
            console.error( "Email ou senha inválidos" )
            this.presentToast('Email ou senha inválidos', 'danger')
          }
        } )
      } catch (error) {
        console.log("Error")
      } finally {
        //this.router.navigate(['/projects/task'], { queryParams: { project } });
        //this.loginLoading = false;
      }
    }
  }

  async presentToast( message: string, color: string ) {
    const toast = await this.toastController.create({
      message: message, duration: 6000, color: color, animated: true, position: 'bottom'
    });
    toast.present();
  }

  ngOnInit() {
    if( this.authService.isLogged() ) { this.router.navigate( ['home'] ) }
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(250)]]
    })
  }

}
