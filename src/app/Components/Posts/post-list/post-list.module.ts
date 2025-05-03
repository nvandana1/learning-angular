import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PostsCreateModule } from "../posts-create/posts-create.module";

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    AccordionModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    PostsCreateModule
],
  exports: [  
    PostListComponent 
  ]
})
export class PostListModule { }
