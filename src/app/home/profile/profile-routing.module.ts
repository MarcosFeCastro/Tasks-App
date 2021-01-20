import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyComponent } from './my/my.component';
import { UpdateComponent } from './update/update.component';
import { VisitComponent } from './visit/visit.component';

const routes: Routes = [
  { path: 'profile', component: MyComponent },
  { path: 'profile/update', component: UpdateComponent },
  { path: 'profile/visit/:userid', component: VisitComponent },

  { path: 'project/:projectid/profile/visit/:userid', component: VisitComponent },
  { path: 'project/:projectid/profile/invite/:userid', component: VisitComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
