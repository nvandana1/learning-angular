import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/posts.module';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = new BehaviorSubject<any[]>([]);
  posts$ = this.posts.asObservable();
  
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  createPost(post:Post) {
    this.http.post(`${this.apiUrl}/posts`, post).subscribe({
      next:(response)=>{
        console.log('Post created successfully', response);
        this.getPosts();
      },
      error:(error)=>{
        console.error('Error creating post', error);
      }
    })
  }

  getPosts() {
    this.http.get(`${this.apiUrl}/posts`).pipe(
      map((response:any) => {
        return response.posts.map((post:any) => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
      })
    ).subscribe({
      next:(response:any)=>{
        this.posts.next(response);
      },
      error:(error)=>{
        console.error('Error fetching posts', error);
      }
    })
  }

  deletePost(id: number) {
    this.http.delete(`${this.apiUrl}/posts/${id}`).subscribe({
      next:(response)=>{
        console.log('Post deleted successfully', response);
        this.getPosts();
      },
      error:(error)=>{
        console.error('Error deleting post', error);
      }
    })
  }

  updatePost(id:number,data:any){
    this.http.put(`${this.apiUrl}/posts/${id}`, data).subscribe({
      next:(response)=>{
        console.log('Post updated successfully', response);
        this.getPosts();
      },
      error:(error)=>{
        console.error('Error updating post', error);
      }
    })
  }
}
