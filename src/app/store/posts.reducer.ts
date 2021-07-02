import {postsAction, POSTS_ACTION} from "./posts.action";

const initialState = {
  posts: []
};

export function postsReducer(state = initialState, action: postsAction) {

  switch (action.type) {


    case POSTS_ACTION.INIT_ACTION: {
      return {
        ...state,
        posts: [...action.payload]
      };
    }

    case POSTS_ACTION.ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    }

    case POSTS_ACTION.EDIT_POST: {

      const updatedPosts = state.posts.map(item => action.oldPayload === item ? action.payload : item);

      return {
        ...state,
        posts: [...updatedPosts]
      };
    }

    case POSTS_ACTION.DELETE_POST: {

      const newPosts = state.posts.filter(item => action.payload !== item);

      return {
        ...state,
        posts: [...newPosts]
      };
    }

    default:
      return state;

  }

}
