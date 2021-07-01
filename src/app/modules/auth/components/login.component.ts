import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../../core/services/data.service";
import {AuthService} from "../../../core/services/auth.service";


@Component({
  selector: 'app-login',
  template: `
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>

              <div class="card-body">
                <form>
                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                    <div class="col-md-6">
                      <input [(ngModel)]="login" class="form-control" id="email" type="email" name="email" required autofocus>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                      <input [(ngModel)]="password" class="form-control" id="password" type="password" name="password" required>
                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                      <button (click)="signIn()" type="submit" class="btn btn-primary">
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

  login: string;
  password: string;

  constructor(private usersService: UsersService, private auth: AuthService) {}

  ngOnInit(): void {}

  async signIn() {
    const user = await this.usersService.getUsers(this.login, this.password);
    if (user) {
      this.auth.setUser(user.login);
    }
  }

}
