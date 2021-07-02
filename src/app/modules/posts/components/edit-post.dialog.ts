import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {EditPost} from "../../../store/posts.action";
import {Post} from "../../../core/classes/post";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-edit-post',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Creating a new post</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group row">
        <label for="email" class="col-md-12 col-form-label">Text</label>

        <div class="col-md-12">
          <textarea [(ngModel)]="text" class="form-control" rows="10"></textarea>
        </div>
      </div>

      <div class="form-group row">
        <label for="password" class="col-md-12 col-form-label">Date</label>

        <div class="col-md-12">
          <input type="date" [ngModel]="date | date:'yyyy-MM-dd'" class="form-control">
        </div>
      </div>

    </div>
    <div class="modal-footer">
      <button [disabled]="!isValid()" type="button" class="btn btn-outline-primary" (click)="updatePost()">Create</button>
    </div>
  `,
  providers: [AuthService]
})
export class EditPostDialogComponent implements OnInit {
  @Input() post: Post;

  text: string = '';
  date: Date;

  constructor(private store: Store<AppState>,
              public modal: NgbActiveModal,
              private auth: AuthService) {}

  ngOnInit(): void {
    let parts = this.post.date.split('.');
    this.text = this.post.text;
    this.date = new Date(Number.parseFloat(parts[2]), Number.parseFloat(parts[1]) - 1, Number.parseFloat(parts[0]));
  }


  updatePost(): void {

    console.log(this.date);
    const post = new Post();
    post.isEdited = 'true';
    post.author = this.auth.getUser();
    post.date = this.getDateInFormat(this.date);
    post.text = this.text;
    post.pdf = this.post.pdf;

    if (post) {
      this.store.dispatch(new EditPost(this.post, post));
      this.modal.close(post);
    } else {
      this.modal.close(new Error('Post is not created'));
    }
  }

  doTextareaValueChange(ev) {
    try {
      this.text = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  isValid(): boolean {
    return !!(this.text && this.date);
  }

  getDateInFormat(date: Date): string {

    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    let day = dd.toString();
    let month = mm.toString();

    if (dd < 10) {
      day = '0' + dd;
    }

    if (mm < 10) {
      month = '0' + mm;
    }

    const result = day + '.' + month + '.' + yyyy;

    return result;

  }


}
