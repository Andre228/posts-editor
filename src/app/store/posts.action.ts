import {Action} from "@ngrx/store";
import {Post} from "../core/classes/post";

export namespace POSTS_ACTION {
  export const INIT_ACTION = 'INIT_POST';
  export const ADD_POST = 'ADD_POST';
  export const EDIT_POST = 'EDIT_POST';
  export const DELETE_POST = 'DELETE_POST';
}

export class InitPosts implements Action {
  readonly type = POSTS_ACTION.INIT_ACTION;

  constructor(public payload: Post []) {}
}

export class AddPost implements Action {
  readonly type = POSTS_ACTION.ADD_POST;

  constructor(public payload: Post) {}
}

export class EditPost implements Action {
  readonly type = POSTS_ACTION.EDIT_POST;

  constructor(public oldPayload: Post, public payload: Post) {}
}

export class DeletePost implements Action {
  readonly type = POSTS_ACTION.DELETE_POST;

  constructor(public payload: Post) {}
}

export type postsAction = InitPosts | AddPost | EditPost | DeletePost;




