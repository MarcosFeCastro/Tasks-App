import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  form: FormGroup;

  formSubmitted: boolean = false;

  private user: any = null

  constructor( private formBuilder: FormBuilder, private userService: UserService, private router: Router ) { }

  goToPage( url ) { this.router.navigate( [`${ url }`], { replaceUrl: true } ) }

  hasErrorForm( field: string ) {
    return this.form.get( field ).errors
  }

  submmit(){
    this.formSubmitted = true
    if( this.form.valid ) {
      let data = { first_name: this.form.get('firstName').value, last_name: this.form.get('lastName').value, carrer: this.form.get('carrer').value, intro: this.form.get('intro').value, phoneNumber: this.form.get('phoneNumber').value }
      this.userService.update( data ).subscribe( response => {
        console.log( response )
        if ( response.status == 200 ) {
          this.formSubmitted = false
          this.goToPage( '/profile' )
        } else {
          this.formSubmitted = false
        }
      }, error => {
        console.error( error )
        this.formSubmitted = false
      } )
    }
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      //username: [ null, [ Validators.required, Validators.minLength( 1) ] ],
      firstName: [ null, [ Validators.required, Validators.minLength( 1 ), Validators.maxLength( 250 ) ] ],
      lastName: [ null, [ Validators.maxLength( 250 ) ] ],
      //email: [ null, [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 250 ) ] ],
      carrer: [ null, [ Validators.maxLength( 250 ) ] ],
      intro: [ null, [ Validators.maxLength( 250 ) ] ],
      phoneNumber: [ null, [ Validators.maxLength( 12 ) ] ]
    })

    this.userService.getMyProfile().subscribe( response => {
      console.log( response )
      this.user = response
      this.form.setValue( {
        firstName: response.first_name, lastName: response.last_name || null, carrer: response.carrer || null, intro: response.intro || null, phoneNumber: response.intro || null
      } )
    }, error => {
      console.error( error )
    } )

  }

}
