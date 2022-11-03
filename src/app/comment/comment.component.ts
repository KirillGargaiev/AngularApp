import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from '../store/models/comment.model'
import {Select, Store} from "@ngxs/store";
import {addComment} from "../store/actions/comment.action";
import {Element} from "@angular/compiler";
import {CommentState} from "../store/state/comment.state";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit{

  constructor(private store: Store) { }

  @Input() comment!: Comment
  @Input() form!: Comment
  @Input() replies!: Comment[]
  @Input() valid!: boolean

  @Select(CommentState.getComments)comments$!: Observable<Comment[]>


  ngOnInit(): void {
  }

  OnReply(id: number, postId: number){
    if (this.valid)
    this.store.dispatch(new addComment({...this.form, fatherId:id, postId: postId}))

  }

  getReplies(id: number, comments: Comment[]){
    return comments.filter((comment)=> comment.fatherId === id)
      .sort((a,b) => a.id - b.id)
  }

}


