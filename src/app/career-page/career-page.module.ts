import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CareerPageComponent} from "./career-page.component";

@NgModule({
  declarations:[
    CareerPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: CareerPageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class CareerPageModule {

}
