import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {ReviewState} from "../store/state/review.state";
import {Observable} from "rxjs";
import {Review} from "../store/models/review.model";

@Component({
  selector: 'app-reviews-block',
  templateUrl: './reviews-block.component.html',
  styleUrls: ['./reviews-block.component.css']
})
export class ReviewsBlockComponent  {

  @Select(ReviewState.getReviews)reviews$!: Observable<Review[]>


  scrollRight(){
    document.getElementById('reviews_wrap')!.scrollLeft += 50
  }

  scrollLeft(){
    document.getElementById('reviews_wrap')!.scrollLeft -= 50
  }

}
