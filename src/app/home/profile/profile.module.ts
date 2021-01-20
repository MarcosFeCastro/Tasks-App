import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { MyComponent } from './my/my.component';
import { VisitComponent } from './visit/visit.component';
import { InviteComponent } from './invite/invite.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MyComponent,
    UpdateComponent,
    VisitComponent,
    InviteComponent
  ]
})
export class ProfilePageModule {}
