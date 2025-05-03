import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsCreateComponent } from './posts-create.component';

const routes: Routes = [{ path: '', component: PostsCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsCreateRoutingModule { }
