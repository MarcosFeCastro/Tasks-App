import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAllComponent } from './list-all/list-all.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { InviteComponent } from './invite/invite.component';

const routes: Routes = [
  { path: 'project', component: ListAllComponent },
  { path: 'project/details/:projectid', component: DetailsComponent },
  { path: 'project/create', component: CreateComponent },
  { path: 'project/update/:projectid', component: CreateComponent },
  { path: 'project/:projectid/invite', component: InviteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}
