import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAllComponent } from './list-all/list-all.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: ListAllComponent },
  { path: 'add', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactPageRoutingModule {}
