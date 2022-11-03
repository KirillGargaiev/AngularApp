import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Picture} from "../store/models/picture.model";
import {Review} from "../store/models/review.model";
import {Select, Store} from "@ngxs/store"
import {addReview, getReviews, removeReview} from "../store/actions/review.actions";
import {getPicture} from "../store/actions/picture.actions";
import {PictureState} from "../store/state/picture.state";
import {ReviewState} from "../store/state/review.state";
import {addToBasket, removeFromBasket} from "../store/actions/basket.action";
import {BasketState} from "../store/state/basket.state";
import {productPageAnimation, productPageMenuAnimation} from "../app.animations";
import {Meta, Title} from "@angular/platform-browser";



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [productPageAnimation, productPageMenuAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductPageComponent implements OnInit, OnDestroy{


  @Select(PictureState.getPicture)product$!: Observable<Picture>
  @Select(ReviewState.getCurrentReviews)reviews$!: Observable<Review[]>
  @Select(BasketState.getBasketTitles)titles$!: String[]

  id!: number;
  form!: FormGroup;
  description = false;
  reviews = true;
  questions = false
  sub$!: Subscription;



  constructor(private store: Store,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta)
  {}

  showDescription(){
    this.description = true;
    this.reviews = false;
    this.questions = false;
  }

  showReviews(){
    this.description = false;
    this.reviews = true;
    this.questions = false;
  }

  showQuestions(){
    this.description = false;
    this.reviews = false;
    this.questions = true;
  }

  storeRemoveReviews(id: number){
    this.store.dispatch(new removeReview(id))
  }

  storeAddReview(review: Review){
    this.store.dispatch(new addReview(review))
    this.form.reset()
  }

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params: Params) => {

      this.store.dispatch([new getPicture(params['id']), new getReviews(params['id'])])
      this.product$.subscribe((products)=>{
        if(products){
          const title = products.title
          this.title.setTitle(title)
          this.meta.addTags([
            {name: 'description', content:`This is ${title} page`}
          ])
        }
      })

      this.id = params['id']
    })

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      score: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.maxLength(1000)])
    })
  }

  ngOnDestroy(){
    this.sub$.unsubscribe()
  }



  submit() {
    const formData = {...this.form.value, productId: this.id}
    this.storeAddReview(formData)
  }

  addToCard(pic: Picture){
    this.store.dispatch(new addToBasket(pic))
    pic.inBasket = true
  }

  removeFromCard(pic: Picture){
    this.store.dispatch(new removeFromBasket(pic.id))
    pic.inBasket = false
  }

}
