import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {FilteredCategoriesComponent} from "./filtered-categories/filtered-categories.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {productPageAnimation} from "./app.animations";


const routes: Routes = [
  {path: '', title:'Picture shop',component: HomePageComponent},
  {path: 'about', title:'About us', loadChildren: ()=> import('./about-page/about-page.module').then(m => m.AboutPageModule)},
  {path: 'career', title:'Career', loadChildren: ()=> import('./career-page/career-page.module').then(m => m.CareerPageModule)},
  {path: 'categories', title:'Categories', component: CategoriesComponent},
  {path: 'categories/:id', component: FilteredCategoriesComponent},
  {path: 'product/:id', component:ProductPageComponent},
  {path: 'basket',title:'Basket', loadChildren: ()=> import('./basket-page/basket-page.module').then(m => m.BasketPageModule)},
  {path: 'blog', title:"Blog", component:BlogPageComponent},
  {path: 'post/:id', component: PostPageComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
