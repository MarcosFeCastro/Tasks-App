import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';

import { HomePage } from './home.page';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [

  { path: '', component: HomePage, children: [
    { path: '', component: TodoComponent },
    { path: '', canActivate: [ AuthGuard ], loadChildren: () => import( './project/project.module' ).then( m => m.ProjectPageModule ) },
    { path: '', canActivate: [ AuthGuard ], loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule ) },
    { path: 'group', canActivate: [ AuthGuard ], loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule ) },
    { path: 'contact', canActivate: [ AuthGuard ], loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule ) },
    { path: 'message', canActivate: [ AuthGuard ], loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule ) },
    { path: '', canActivate: [ AuthGuard ], loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule) }
  ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
