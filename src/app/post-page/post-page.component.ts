import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Params} from "@angular/router";
import {getPostById} from "../store/actions/post.action";
import {PostState} from "../store/state/post.state";
import {Observable, Subscription} from "rxjs";
import {Post} from "../store/models/post.model";
import {Comment} from "../store/models/comment.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentState} from "../store/state/comment.state";
import {addComment, getComments} from "../store/actions/comment.action";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent implements OnInit, OnDestroy {

  constructor(private store: Store,
              private route: ActivatedRoute)
  {}

  @Select(PostState.getPostById)post$!: Observable<Post>
  @Select(CommentState.getComments)comments$!: Observable<Comment[]>
  @Select(CommentState.getRootComments)rootComments$!: Observable<Comment[]>
  sub$!: Subscription
  form!: FormGroup
  id!: number

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new getPostById(params['id']))
      this.store.dispatch(new getComments(params['id']))
      this.id = params['id']
    })
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      text: new FormControl('', [Validators.required]),
      saveName: new FormControl(false)
    })
  }

  ngOnDestroy(){
    this.sub$.unsubscribe()
  }

  submit(){
    if (!this.form.invalid){
      const formData = {...this.form.value, postId: +this.id}
      this.store.dispatch(new addComment(formData))
    }
    this.form.reset()
  }

  getReplies(id: number, comments: Comment[]){
    return comments.filter((comment)=> comment.fatherId === id)
      .sort((a,b) => a.id - b.id)
  }

}
