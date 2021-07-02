import {Component, OnInit} from "@angular/core";
import {PostsService} from "../../../core/services/posts.service";
import {ReplaySubject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Post} from "../../../core/classes/post";
import {InitPosts} from "../../../store/posts.action";

@Component({
  selector: 'app-posts',
  template: `
    <div class="container mb-3">
      <div class="justify-content-center">
        <div class="container mt-5  mt-3">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <input [(ngModel)]="keywords" class="form-control" placeholder="Search...">
            </div>
          </div>
        </div>
        <app-post *ngFor="let item of posts | search: keywords" [post]="item" [keywords]="keywords"></app-post>
      </div>
    </div>
  `,
  providers: [PostsService]
})

export class AppPostsComponent implements OnInit {

  posts: Post [] = [];
  keywords: string;

  private readonly destroyed$ = new ReplaySubject<void>(1);

  constructor(private store: Store<AppState>, private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().pipe(takeUntil(this.destroyed$)).subscribe(items => {
      this.store.dispatch(new InitPosts(items.posts));
      this.store.select('postReducer').pipe(takeUntil(this.destroyed$)).subscribe(posts => {
        this.posts = posts.posts;
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

}
