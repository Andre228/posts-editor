import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

export interface User {
  login: string;
  password: string;
}

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  public async getUser(login: string, password: string): Promise<User> {

    const usersArray = await this.http.get('../../assets/mock-users.json').toPromise() as any;

    const foundUser = usersArray.users.find(item => login === item.login && password === item.password);

    return foundUser;
  }
}
