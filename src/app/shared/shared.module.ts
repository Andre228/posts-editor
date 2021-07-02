import {NgModule} from '@angular/core';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppPopupComponent} from "./widgets/popups/components/popups.component";
import {PopupService} from "./widgets/popups/services/popup.service";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppPopupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  exports: [
    BrowserModule,
    NgbModule,
    AppPopupComponent
  ],
  providers: [PopupService]
})
export class SharedModule { }
