import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {AddPost} from "../../../store/posts.action";
import {Post} from "../../../core/classes/post";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-new-post',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Creating a new post</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.close('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="postForm">
        <div class="form-group row">
          <label for="email" class="col-md-12 col-form-label">Text</label>

          <div class="col-md-12">
            <textarea formControlName="text" class="form-control" rows="10" [class.error]="text.invalid"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="password" class="col-md-12 col-form-label">Date</label>

          <div class="col-md-12">
            <input formControlName="date" type="date" class="form-control" [class.error]="date.invalid">
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button [disabled]="text.invalid || date.invalid" type="button" class="btn btn-outline-primary" (click)="createPost()">Create</button>
    </div>
  `,
  providers: [AuthService]
})
export class AddNewPostDialogComponent implements OnInit {

  postForm: FormGroup;

  constructor(private store: Store<AppState>,
              public modal: NgbActiveModal,
              private auth: AuthService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      date: ['', [
        Validators.required
      ]]
    });
  }

  get text(): AbstractControl | null {
    return this.postForm.get('text');
  }

  get date(): AbstractControl | null {
    return this.postForm.get('date');
  }

  createPost(): void {
    const post = new Post();
    post.isEdited = 'false';
    post.author = this.auth.getUser();
    post.date = this.date.value;
    post.text = this.text.value;

    if (post) {
      this.store.dispatch(new AddPost(post));
      this.modal.close(post);
    } else {
      this.modal.close(new Error('Post is not created'));
    }
  }

}
