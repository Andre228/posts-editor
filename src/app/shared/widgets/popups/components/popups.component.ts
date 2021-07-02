import {Component, TemplateRef} from '@angular/core';
import {PopupService} from "../services/popup.service";


@Component({
  selector: 'app-popup',
  template: `
    <ngb-toast
      *ngFor="let toast of popupService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="popupService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class AppPopupComponent {

  constructor(public popupService: PopupService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
