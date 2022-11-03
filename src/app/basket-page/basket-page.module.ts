import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BasketPageComponent} from "./basket-page.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    BasketPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: BasketPageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class BasketPageModule {

}
