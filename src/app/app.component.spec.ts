import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./core/services/auth.service";


describe('AppComponent', () => {


  const fakeAuthService = jasmine.createSpyObj('fakeAuth', ['isLoggedIn', 'getUser']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
       // StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({}),
        {
          provide: AuthService, useValue: fakeAuthService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
  });

  it(`should called isLoggedIn method and return false value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    localStorage.removeItem('pe-login');
    const result = component.isLoggedIn();
    fixture.detectChanges();
    expect(result).toEqual(false);
  });

  it(`getting user called as TestUser`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    localStorage.setItem('pe-login', 'TestUser');
    const result = component.user;
    fixture.detectChanges();
    expect(result).toEqual('TestUser');
  });

  it('should called addNewPost method and return modal AddNewPostDialogComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const result = component.addNewPost();
    expect(result).toEqual(result);
    fixture.detectChanges();
  });
});
