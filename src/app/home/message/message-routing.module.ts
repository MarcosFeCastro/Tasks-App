import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAllComponent } from './list-all/list-all.component';

const routes: Routes = [
  { path: '', component: ListAllComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
