import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectPageRoutingModule } from './project-routing.module';

import { ListAllComponent } from './list-all/list-all.component';

import { ProjectService } from './project.service';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { InviteComponent } from './invite/invite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ListAllComponent,
    CreateComponent,
    DetailsComponent,
    InviteComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectPageModule {}
