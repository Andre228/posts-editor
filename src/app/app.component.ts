import {Component} from "@angular/core";
import {AuthService} from "./core/services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddNewPostDialogComponent} from "./modules/posts/components/add-new-post.dialog";
import {PopupService} from "./shared/widgets/popups/services/popup.service";
import {Router} from "@angular/router";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {

  constructor(private auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private popupService: PopupService) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get user(): string {
    return this.auth.getUser() || '';
  }

  addNewPost(): NgbModalRef {
    const modalRef = this.modalService.open(AddNewPostDialogComponent, { size: 'lg' });
    modalRef.result
      .then(response => {
        if (!(response instanceof Error) && response && response !== 'close') {
          this.popupService.show('Post successfully created', { classname: 'bg-success text-light', delay: 4000 });
        } else if (response !== 'close') {
          this.popupService.show('An error has occurred ' + response, { classname: 'bg-danger text-light', delay: 4000 });
        }
    })
      .catch((res) => {});

    return modalRef;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
