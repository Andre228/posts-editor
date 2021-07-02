import {NgModule} from '@angular/core';
import {StoreModule} from "@ngrx/store";

import {AppComponent} from "./app.component";
import {ComponentsModule} from "./modules/components.module";
import {APP_ROUTING} from "./router/config/app.routing";
import {AuthGuard} from "./router/guards/auth.guard";
import {AuthService} from "./core/services/auth.service";
import {postsReducer} from "./store/posts.reducer";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    SharedModule,
    StoreModule.forRoot({postReducer: postsReducer}),
    APP_ROUTING,
    ComponentsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
