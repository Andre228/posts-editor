import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../classes/post";

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<any> {
    return this.http.get<Post []>('../../assets/mock-posts.json');
  }
}
