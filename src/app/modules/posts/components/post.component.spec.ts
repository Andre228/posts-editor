import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {AppPostComponent} from "./post.component";
import {provideMockStore} from "@ngrx/store/testing";
import {HighlightTextPipe} from "../pipes/highlight.pipe";
import {CommonModule, DatePipe} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

fdescribe('PostComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        NgbModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      declarations: [
        HighlightTextPipe,
        AppPostComponent,
      ],
      providers: [HttpClient, provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  fit('should create component', () => {
    const fixture = TestBed.createComponent(AppPostComponent);
    const component = fixture.componentInstance;
    component.post = {
      id: '131',
      author: 'JohnBB',
      date: '03.07.2021',
      isEdited: 'false',
      text: 'Some short info',
      pdf: 'document.pdf',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });

  fit('should called download method', () => {
    const fixture = TestBed.createComponent(AppPostComponent);
    const component = fixture.componentInstance;

    component.post = {
      id: '131',
      author: 'JohnBB',
      date: '03.07.2021',
      isEdited: 'false',
      text: 'Some short info',
      pdf: 'document.pdf',
    };

    fixture.detectChanges();

    const result = component.download(component.post.pdf);

  });

  fit(`should called isLoggedIn method and return false value`, () => {
    const fixture = TestBed.createComponent(AppPostComponent);
    const component = fixture.componentInstance;

    component.post = {
      id: '131',
      author: 'JohnBB',
      date: '03.07.2021',
      isEdited: 'false',
      text: 'Some short info',
      pdf: 'document.pdf',
    };

    fixture.detectChanges();

    localStorage.removeItem('pe-login');
    const result = component.isLoggedIn();
    fixture.detectChanges();
    expect(result).toEqual(false);
  });

});
