import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostsCreateModule } from "../Posts/posts-create/posts-create.module";
import { PostListModule } from "../Posts/post-list/post-list.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PostsCreateModule,
    PostListModule
],
  exports: [
    HomeComponent
  ],
  providers: [],
})
export class HomeModule { }
