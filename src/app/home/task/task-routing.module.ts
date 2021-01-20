import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAllComponent } from './list-all/list-all.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'task', component: ListAllComponent },
  
  { path: 'task/details/:taskid', component: DetailsComponent },
  { path: 'project/:projectid/task/details/:taskid', component: DetailsComponent },
  
  { path: 'task/create', component: CreateComponent },
  { path: 'task/update/:taskid', component: CreateComponent },
  
  { path: 'project/:projectid/task/create', component: CreateComponent },
  { path: 'project/:projectid/task/update/:taskid', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule {}
