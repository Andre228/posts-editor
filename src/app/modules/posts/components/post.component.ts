import {Component, Input, OnInit} from "@angular/core";
import {Post} from "../../../core/classes/post";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditPostDialogComponent} from "./edit-post.dialog";
import {PopupService} from "../../../shared/widgets/popups/services/popup.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {DeletePost} from "../../../store/posts.action";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-post',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <div class="row justify-content-between post-header">
                <div class="col-md-8">
                  <span innerHTML="{{ post.author | highlight : keywords?.split(' ') }}"></span> - <span innerHTML="{{ post.date | highlight : keywords?.split(' ') }}"></span>
                </div>
                <div *ngIf="isLoggedIn()" class="col-md-3 control-buttons">
                  <button class="btn btn-outline-danger" (click)="deletePost()">Delete</button>
                  <button class="btn btn-outline-primary" (click)="editPost()">Edit</button>
                </div>
              </div>

            </div>
              <div class="card-body">
                <div innerHTML="{{ post.text | highlight : keywords?.split(' ') }}">
                </div>
                <div class="control-view">
                  <div *ngIf="post.pdf" style="justify-content: flex-start">
                    <a (click)="download(post.pdf)" innerHTML="{{ post.pdf | highlight : keywords?.split(' ') }}" class="mt-2 d-flex justify-content-start"></a>
                  </div>
                  <div style="justify-content: flex-end" *ngIf="post.isEdited === 'true'" innerHTML="{{ 'Edited' | highlight : keywords?.split(' ') }}" class="mt-2 d-flex justify-content-end"></div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [AuthService]
})

export class AppPostComponent {

  @Input() post: Post;
  @Input() keywords: string;

  constructor(private store: Store<AppState>,
              private auth: AuthService,
              private modalService: NgbModal,
              private popupService: PopupService) {
  }

  editPost(): void {
    const modalRef = this.modalService.open(EditPostDialogComponent, { size: 'lg' });
    modalRef.result
      .then(response => {
        if (!(response instanceof Error) && response && response !== 'close') {
          this.popupService.show('Post successfully updated', { classname: 'bg-success text-light', delay: 4000 });
        } else if (response !== 'close') {
          this.popupService.show('An error has occurred ' + response, { classname: 'bg-danger text-light', delay: 4000 });
        }
    })
      .catch((res) => {});
    modalRef.componentInstance.post = this.post;
  }

  deletePost(): void {
    this.store.dispatch(new DeletePost(this.post));
    this.popupService.show('Post ' + this.post.author + ' ' + this.post.date + ' successfully deleted', { classname: 'bg-success text-light', delay: 4000 });
  }

  download(file: string) {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/' + file;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
