import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  constructor(private http: HttpClient) {}
  blog: any[] = [];
  edit = false;
  editPostId: string | null = null;
  updatedTitle: string = '';
  updatedContent: string = '';
  ngOnInit(): void {
    this.http.get("http://localhost:8000/posts/get").subscribe(
      (response: any) => {
        this.blog = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editPost(post: any): void {
    this.edit = true; 
    this.editPostId = post._id;
    this.updatedTitle = post.title;
    this.updatedContent = post.content;
  }

  onUpdate(id: any, updatedData: any): void {
    this.http.put(`http://localhost:8000/posts/update/${id}`, updatedData)
      .subscribe(
        () => {
          console.log('Post updated successfully !!');
        },
        error => {
          console.error('Error updating post:', error);
        }
      );
      this.edit = false; 
  }
  
  onDelete(id: any): void {
      this.http.delete(`http://localhost:8000/posts/delete/${id}`)
        .subscribe(
          () => {
            console.log('Post deleted successfully !!');
          },
          error => {
            console.error('Error deleting post:', error);
          }
      );
  }
}
