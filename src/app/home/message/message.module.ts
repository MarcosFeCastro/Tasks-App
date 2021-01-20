import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePageRoutingModule } from './message-routing.module';
import { MessageService } from './message.service';

import { ListAllComponent } from './list-all/list-all.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule
  ],
  declarations: [
    ListAllComponent
  ],
  providers: [
    MessageService
  ]
})
export class MessagePageModule {}
