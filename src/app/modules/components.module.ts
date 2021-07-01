import { NgModule } from '@angular/core';
import {AppPostsComponent} from "./posts/components/posts.component";
import {AppNotFoundComponent} from "./not-found/components/not-found.component";
import {AppLoginComponent} from "./auth/components/login.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppLoginComponent,
    AppPostsComponent,
    AppNotFoundComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers: []
})
export class ComponentsModule { }
