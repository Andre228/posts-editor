import {Post} from "../core/classes/post";

export interface AppState {
  postReducer: {
    posts: Post []
  };
}
