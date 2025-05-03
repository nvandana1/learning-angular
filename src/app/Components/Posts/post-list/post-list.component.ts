import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts.module';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  addPostDialog = false;
  private postSubscriber: any;

  posts: Post[] = [];
  selectedPost!: Post|null;

  constructor(private postService: PostService,private dialogService: DialogService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscriber = this.postService.posts$
      .subscribe({
        next: (response: any) => {
          this.posts = response;
        },
        error: (error: any) => {
          console.error('Error fetching posts', error);
        }
      });
      this.dialogService.closeDialog$.subscribe(() => {
        this.addPostDialog = false;
      })
  }

  editEvent(post: Post) {
    this.selectedPost = post;
    }

  deletePost(id: number): void {
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.postSubscriber.unsubscribe();
  }

}

