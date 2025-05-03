import { Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsCreateComponent implements OnInit,OnChanges,OnDestroy {
  @Input() selectedPost: any;
  postsForm!: FormGroup;
  

  constructor(private fb:FormBuilder,private postService : PostService,private dialogService: DialogService) { }
  
  ngOnChanges() {
    if (this.selectedPost) {
      this.postsForm.patchValue({
        id: this.selectedPost.id,
        title: this.selectedPost.title,
        content: this.selectedPost.content
      });
    }
  }

  ngOnInit(): void {
    this.postsForm = this.fb.group({
      id: [''],
      title: ['',[Validators.required]],
      content: ['',[Validators.required]],
    });
  }

  createPost() {
    if(this.postsForm.valid){
      if(!this.selectedPost){
        this.postService.createPost(this.postsForm.value);
      this.postsForm.reset();
      this.dialogService.closeDialog();
      }
      else{
        this.postService.updatePost(this.selectedPost.id,this.postsForm.value);
      this.postsForm.reset();
      this.dialogService.closeDialog();
      }
    }
  }
  ngOnDestroy(): void {
      
  }

}
