import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../../core/services/users.service";
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  template: `
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>
                <div class="card-body">
                  <form [formGroup]="loginForm">
                    <div class="form-group row">
                      <label for="email" class="col-md-4 col-form-label text-md-right">Login</label>

                      <div class="col-md-6">
                        <input formControlName="login" class="form-control" [class.error]="login.invalid" autofocus>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                      <div class="col-md-6">
                        <input formControlName="password" class="form-control" [class.error]="password.invalid">
                      </div>
                    </div>

                    <div *ngIf="userNotFound" class="form-group justify-content-center row not-found">
                      <div class="col-md-4">
                        <span>Bad password or login</span>
                      </div>
                    </div>

                    <div class="form-group row mb-0">
                      <div class="col-md-8 offset-md-4">
                        <button [disabled]="login.invalid || password.invalid" (click)="signIn()" type="submit" class="btn btn-primary">
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
  `,
  providers: [UsersService, AuthService]
})

export class AppLoginComponent implements OnInit {

  loginForm: FormGroup;
  userNotFound: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private auth: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async signIn(): Promise<void> {
    const user = await this.usersService.getUser(this.login.value, this.password.value);
    if (user) {
      this.auth.login(user.login);
      this.router.navigate(['']);
    } else {
      this.userNotFound = true;
    }
  }

}
