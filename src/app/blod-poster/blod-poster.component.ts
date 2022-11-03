import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {PostState} from "../store/state/post.state";
import {Observable} from "rxjs";
import {Post} from "../store/models/post.model";

@Component({
  selector: 'app-blod-poster',
  templateUrl: './blod-poster.component.html',
  styleUrls: ['./blod-poster.component.css']
})
export class BlodPosterComponent implements OnInit {

  constructor() { }

  @Select(PostState.getFeatured)featured$!: Observable<Post[]>
  @Select(PostState.getPosts)posts$!: Observable<Post[]>

  ngOnInit(): void {
  }

}
