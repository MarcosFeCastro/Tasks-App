import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';
import { GroupService } from './group.service';

import { ListAllComponent } from './list-all/list-all.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule
  ],
  declarations: [
    ListAllComponent
  ],
  providers: [
    GroupService
  ]
})
export class GroupPageModule {}
