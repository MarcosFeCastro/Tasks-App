import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskService } from './task.service';
import { UserTaskService } from './user-task.service';

import { ListAllComponent } from './list-all/list-all.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListAllComponent,
    CreateComponent,
    DetailsComponent
  ],
  providers: [
    TaskService,
    UserTaskService
  ]
})
export class TaskPageModule {}
