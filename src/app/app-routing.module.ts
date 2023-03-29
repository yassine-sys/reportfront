import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { GroupFormComponent } from './components/groupform/groupform.component';
import { NestedGridComponent } from './components/nested-grid/nested-grid.component';
import { AddgroupComponent } from './components/addgroup/addgroup.component';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';

const routes: Routes = [
  {path:'group',component:GroupComponent},
  {path:'group/add',component:AddgroupComponent},
  {path:'group/:id',component:AddgroupComponent},
  {path:'modules',component:NestedGridComponent},
  {path:'users',component:UserManagmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
