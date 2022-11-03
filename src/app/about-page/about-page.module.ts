import {NgModule} from "@angular/core";
import {AboutPageComponent} from "./about-page.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[
    AboutPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: AboutPageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AboutPageModule {

}
