import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TodoComponent } from './todo/todo.component';

import { ProjectPageModule } from './project/project.module';
import { ContactPageModule } from './contact/contact.module';
import { GroupPageModule } from './group/group.module';
import { MessagePageModule } from './message/message.module';
import { TaskPageModule } from './task/task.module';
import { ProfilePageModule } from './profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    HomePageRoutingModule,

    ProjectPageModule,
    ContactPageModule,
    GroupPageModule,
    MessagePageModule,
    TaskPageModule,
    ProfilePageModule

  ],
  declarations: [
    HomePage,
    TodoComponent,
  ]
})
export class HomePageModule {}
