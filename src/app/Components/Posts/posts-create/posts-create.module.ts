import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCreateComponent } from './posts-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostsCreateRoutingModule } from './posts-create-routing.module';


@NgModule({
  declarations: [PostsCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    PostsCreateRoutingModule
  ],
  exports: [
    PostsCreateComponent
  ],
  providers: [],
})
export class PostsCreateModule { }
