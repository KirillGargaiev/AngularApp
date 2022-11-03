import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BestsellersComponent } from './bestsellers/bestsellers.component';
import { RankingComponent } from './ranking/ranking.component';
import { PopularComponent } from './popular/popular.component';
import { PictureItemComponent } from './picture-item/picture-item.component';
import { HeaderComponent } from './header/header.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import {CategoriesService} from "./services/categories.service";
import { MenuComponent } from './menu/menu.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { HomePageComponent } from './home-page/home-page.component';
import {ProductPageComponent} from "./product-page/product-page.component";
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { FilteredCategoriesComponent } from './filtered-categories/filtered-categories.component';
import {NgxsModule} from "@ngxs/store";
import {ReviewState} from "./store/state/review.state";
import {CategoryState} from "./store/state/category.state"
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {PictureState} from "./store/state/picture.state";
import {BasketState} from "./store/state/basket.state";
import { ReviewsBlockComponent } from './reviews-block/reviews-block.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import {PostState} from "./store/state/post.state";
import { PostPageComponent } from './post-page/post-page.component';
import {CommentState} from "./store/state/comment.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CommentComponent } from './comment/comment.component';
import { BlodPosterComponent } from './blod-poster/blod-poster.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppComponent,
    BestsellersComponent,
    RankingComponent,
    PopularComponent,
    PictureItemComponent,
    HeaderComponent,
    TooltipDirective,
    PhoneNumberPipe,
    MenuComponent,
    HomePageComponent,
    ProductPageComponent,
    CategoriesComponent,
    FooterComponent,
    FilteredCategoriesComponent,
    ReviewsBlockComponent,
    BlogPageComponent,
    PostPageComponent,
    CommentComponent,
    BlodPosterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxsModule.forRoot([
      ReviewState,
      CategoryState,
      PictureState,
      BasketState,
      PostState,
      CommentState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
