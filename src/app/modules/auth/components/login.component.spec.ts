import {TestBed} from "@angular/core/testing";
import {AppLoginComponent} from "./login.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

fdescribe('LoginComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        AppLoginComponent
      ],
      providers: [HttpClient]
    }).compileComponents();
  });

  fit('should create the login component with \'LoginTest\' login and \'qwerty\' password', () => {
    const fixture = TestBed.createComponent(AppLoginComponent);
    const component = fixture.componentInstance;

    component.loginForm = new FormBuilder().group({
      login: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
    });

    fixture.detectChanges();


    component.loginForm.controls.login.setValue('LoginTest');
    const resultLogin = component.login.value;

    component.loginForm.controls.password.setValue('qwerty');
    const resultPassword = component.password.value;


    fixture.detectChanges();

    expect(resultLogin).toEqual('LoginTest');
    expect(resultPassword).toEqual('qwerty');

  });

  fit(`button 'sign in' has been disabled`, () => {
    const fixture = TestBed.createComponent(AppLoginComponent);
    const component = fixture.componentInstance;

    component.loginForm = new FormBuilder().group({
      login: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
    });

    fixture.detectChanges();

    component.loginForm.controls.login.setValue('LoginTest');
    component.loginForm.controls.password.setValue('');

    const buttonDisabled = component.login.invalid || component.password.invalid;

    fixture.detectChanges();

    expect(buttonDisabled).toEqual(true);
  });

  fit(`'sign in' method has been called within login as 'JackMack' and 'pjFSwws481' password`, () => {
    const fixture = TestBed.createComponent(AppLoginComponent);
    const component = fixture.componentInstance;

    component.loginForm = new FormBuilder().group({
      login: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
    });

    fixture.detectChanges();


    component.loginForm.controls.login.setValue('JackMack');
    component.loginForm.controls.password.setValue('pjFSwws481');

    fixture.detectChanges();

    const result = component.signIn();
    result
      .then(user => {
        expect(user.login).toEqual('JackMack');
        expect(user.password).toEqual('pjFSwws481');
      })
      .catch(err => {
        console.error(err);
      });
  });

  fit(`inputs should contain a class 'error' if they have some errors`, () => {
    const fixture = TestBed.createComponent(AppLoginComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    component.loginForm = new FormBuilder().group({
      login: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
    });

    component.loginForm.controls.login.setValue('');
    const loginInput = fixture.debugElement.query(By.css('.log'));

    fixture.detectChanges();

    expect(loginInput.nativeElement.classList).toContain('error');

  });
});
