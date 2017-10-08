import { ADD_FRIENDS, ADD_FOLLOWERS, ADD_FOLLOWING,
         ADD_FRIEND_REQUESTS, ACCEPT_FRIEND,
         REJECT_FRIEND } from '../actions/FriendActions';

// Initial State
const initialState = {
  friends: {},
  friendRequests: [],
  followers: {},
  following: {},
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRIENDS: {
      const newFriends = Object.assign({}, state.friends);
      newFriends[action.userid] = action.friends;
      return {
        friends: newFriends,
        friendRequested: state.friendRequested,
        friendRequests: state.friendRequests,
        followers: state.followers,
        following: state.following,
      };
    }

    case ADD_FOLLOWERS: {
      const newFollowers = Object.assign({}, state.followers);
      newFollowers[action.userid] = action.followers;
      return {
        friends: state.friends,
        friendRequested: state.friendRequested,
        friendRequests: state.friendRequests,
        followers: newFollowers,
        following: state.following,
      };
    }

    case ADD_FOLLOWING: {
      const newFollowing = Object.assign({}, state.following);
      newFollowing[action.userid] = action.following;
      return {
        friends: state.friends,
        friendRequested: state.friendRequested,
        friendRequests: state.friendRequests,
        followers: state.followers,
        following: newFollowing,
      };
    }

    case ADD_FRIEND_REQUESTS: {
      let newRequests = state.friendRequests.slice();
      newRequests = action.requests;
      return {
        friends: state.friends,
        friendRequested: state.friendRequested,
        friendRequests: newRequests,
        followers: state.followers,
        following: state.following,
      };
    }

    case ACCEPT_FRIEND: {
      const newRequests = [];
      const newFriends = Object.assign({}, state.friends);
      if (newFriends[action.loginUser]) {
        newFriends[action.loginUser] = newFriends[action.loginUser].slice();
        state.friendRequests.forEach((each) => {
          if (each.userid !== action.userid) {
            newRequests.push(each);
          } else {
            each.loginUserFriends = true;
            each.loginUserFollowing = true;
            each.loginUserIsFollowed = true;
            newFriends[action.loginUser].push(each);
          }
        });
      }
      return {
        friends: newFriends,
        friendRequested: state.friendRequested,
        friendRequests: newRequests,
        followers: state.followers,
        following: state.following,
      };
    }

    case REJECT_FRIEND: {
      const newRequests = [];
      state.friendRequests.forEach((each) => {
        if (each.userid !== action.userid) {
          newRequests.push(each);
        }
      });
      return {
        friends: state.friends,
        friendRequested: state.friendRequested,
        friendRequests: newRequests,
        followers: state.followers,
        following: state.following,
      };
    }

    default:
      return state;
  }
};

/* Selectors */

// Export Reducer
export default FriendReducer;
