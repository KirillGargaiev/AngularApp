import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {PostState} from "../store/state/post.state";
import {Observable} from "rxjs";
import {Post} from "../store/models/post.model";
import {CategoryState} from "../store/state/category.state";
import {Category} from "../store/models/category.model";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {


  listView = false
  @Select(PostState.getPosts)posts$!: Observable<Post[]>
  @Select(PostState.getFeatured)featured$!: Observable<Post[]>
  @Select(CategoryState.getCategories)menu$!: Observable<Category[]>


  ngOnInit(): void {
  }

  toGridView(){
    this.listView = false
  }

  toListView(){
    this.listView = true;
  }

}
