import callApi from '../util/apiCaller';

export const ADD_FRIENDS = 'ADD_FRIENDS';
export const ADD_FOLLOWERS = 'ADD_FOLLOWERS';
export const ADD_FOLLOWING = 'ADD_FOLLOWING';
export const ADD_FRIEND_REQUESTS = 'ADD_FRIEND_REQUESTS';
export const ACCEPT_FRIEND = 'ACCEPT_FRIEND';
export const REJECT_FRIEND = 'REJECT_FRIEND';

export function addFriends(friends, userid) {
  return {
    type: ADD_FRIENDS,
    userid,
    friends,
  };
}

export function addFollowers(followers, userid) {
  return {
    type: ADD_FOLLOWERS,
    userid,
    followers,
  };
}

export function addFollowing(following, userid) {
  return {
    type: ADD_FOLLOWING,
    userid,
    following,
  };
}

export function addFriendRequests(requests, userid) {
  return {
    type: ADD_FRIEND_REQUESTS,
    userid,
    requests,
  };
}

export function acceptFriend(userid, loginUser) {
  return {
    type: ACCEPT_FRIEND,
    loginUser,
    userid,
  };
}

export function rejectFriend(userid) {
  return {
    type: REJECT_FRIEND,
    userid,
  };
}

export function getFriendList(userid, next) {
  return (dispatch) => {
    return callApi(`webgetfriendlist?userid=${userid}`).then((result) => {
      if (result.data) {
        dispatch(addFriends(result.data, userid));
        if (next) {
          next(result.data);
        }
      } else {
        console.log(result.error);
      }
    });
  };
}

export function getFollowerList(userid, next) {
  return (dispatch) => {
    return callApi(`webgetfollowerlist?userid=${userid}`).then((result) => {
      if (result.data) {
        dispatch(addFollowers(result.data, userid));
        if (next) {
          next(result.data);
        }
      } else {
        console.log(result.error);
      }
    });
  };
}

export function getFollowingList(userid, next) {
  return (dispatch) => {
    return callApi(`webgetfollowinglist?userid=${userid}`).then((result) => {
      if (result.data) {
        dispatch(addFollowing(result.data, userid));
        if (next) {
          next(result.data);
        }
      } else {
        console.log(result.error);
      }
    });
  };
}

export function getFriendStatus(userid, loginUser, next) {
  return () => {
    return callApi(`webgetfriendstatus?userid=${userid}&loginUser=${loginUser}`).then((result) => {
      if (result.data) {
        next(result.data);
      } else {
        console.log(result.error);
        next(0);
      }
    });
  };
}

export function sendFriendRequest(userid, next) {
  return () => {
    return callApi('websendfriendrequest', 'post', { userid }).then((result) => {
      if (result.status) {
        next(result.status);
      } else {
        console.log(result.error);
        next(result.error);
      }
    });
  };
}

export function acceptFriendRequest(userid, loginUser, next) {
  return (dispatch) => {
    return callApi('webacceptfriendrequest', 'post', { userid }).then((result) => {
      if (result.status) {
        dispatch(acceptFriend(userid, loginUser));
        if (next) {
          next(result.status);
        }
      } else {
        console.log(result.error);
        if (next) {
          next(result.error);
        }
      }
    });
  };
}

export function rejectFriendRequest(userid, next) {
  return (dispatch) => {
    return callApi('webrejectfriendrequest', 'post', { userid }).then((result) => {
      if (result.status) {
        dispatch(rejectFriend(userid));
        if (next) {
          next(result.status);
        }
      } else {
        console.log(result.error);
        if (next) {
          next(result.error);
        }
      }
    });
  };
}

export function cancelFriendRequest(userid, next) {
  return () => {
    return callApi('webcancelfriendrequest', 'post', { userid }).then((result) => {
      if (result.status) {
        next(result.status);
      } else {
        console.log(result.error);
        next(result.error);
      }
    });
  };
}

export function removeFriend(userid, next) {
  return () => {
    return callApi('webremovefriend', 'post', { userid }).then((result) => {
      if (result.status) {
        next(result.status);
      } else {
        console.log(result.error);
        next(result.error);
      }
    });
  };
}

export function getFollowingStatus(userid, loginUser, next) {
  return () => {
    return callApi(`webgetfollowingstatus?userid=${userid}&loginUser=${loginUser}`).then((result) => {
      if (result.data) {
        next(result.data);
      } else {
        console.log(result.error);
        next(0);
      }
    });
  };
}

export function followUser(userid, next) {
  return () => {
    return callApi('webfollowuser', 'post', { userid }).then((result) => {
      if (result.status) {
        next(result.status);
      } else {
        console.log(result.error);
        next(result.error);
      }
    });
  };
}

export function unfollowUser(userid, next) {
  return () => {
    return callApi('webunfollowuser', 'post', { userid }).then((result) => {
      if (result.status) {
        next(result.status);
      } else {
        console.log(result.error);
        next(result.error);
      }
    });
  };
}

export function getFriendRequests(loginUser, next) {
  return (dispatch) => {
    return callApi(`webgetfriendrequests?loginUser=${loginUser}`).then((result) => {
      if (result.data) {
        dispatch(addFriendRequests(result.data, loginUser));
        if (next) {
          next(result.data);
        }
      } else {
        console.log(result.error);
        next([]);
      }
    });
  };
}

