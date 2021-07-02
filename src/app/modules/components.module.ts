import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

import {AppPostsComponent} from "./posts/components/posts.component";
import {AppNotFoundComponent} from "./not-found/components/not-found.component";
import {AppLoginComponent} from "./auth/components/login.component";
import {AppPostComponent} from "./posts/components/post.component";
import {SearchPipe} from "./posts/pipes/search.pipe";
import {HighlightTextPipe} from "./posts/pipes/highlight.pipe";
import {AddNewPostDialogComponent} from "./posts/components/add-new-post.dialog";
import {EditPostDialogComponent} from "./posts/components/edit-post.dialog";

@NgModule({
  declarations: [
    AppLoginComponent,
    SearchPipe,
    HighlightTextPipe,
    AddNewPostDialogComponent,
    EditPostDialogComponent,
    AppPostComponent,
    AppPostsComponent,
    AppNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    AppPostsComponent
  ],
  providers: []
})
export class ComponentsModule { }
