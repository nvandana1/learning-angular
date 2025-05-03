import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent ,children:[
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: () => import('../Posts/post-list/post-list.module').then(m => m.PostListModule) },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
