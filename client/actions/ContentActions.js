import callApi from '../util/apiCaller';

// Export Constants
export const ADD_TRIPTORY = 'ADD_TRIPTORY';
export const ADD_TRIPTORY_LIST = 'ADD_TRIPTORY_LIST';
export const ADD_NEWS_FEED_LIST = 'ADD_NEWS_FFEED_LIST';
export const ADD_BEST_FEED_LIST = 'ADD_BEST_FEED_LIST';
export const ADD_USER_FEED_LIST = 'ADD_USER_FEED_LIST';
export const ADD_FAVOURITE_FEED_LIST = 'ADD_FAVOURITE_FEED_LIST';
export const ADD_MAIN_COMMENT = 'ADD_MAIN_COMMENT';
export const ADD_TRIPTORY_FULL_COMMENT = 'ADD_TRIPTORY_FULL_COMMENT';
export const ADD_TRIPTORY_SIDE_COMMENT = 'ADD_TRIPTORY_SIDE_COMMENT';
export const ADD_TRIPTORY_SINGLE_COMMENT = 'ADD_TRIPTORY_SINGLE_COMMENT';
export const ADD_COMPONENT_SINGLE_COMMENT = 'ADD_COMPONENT_SINGLE_COMMENT';
export const DELETE_TRIPTORY_SINGLE_COMMENT = 'DELETE_TRIPTORY_SINGLE_COMMENT';
export const DELETE_COMPONENT_SINGLE_COMMENT = 'DELETE_COMPONENT_SINGLE_COMMENT';
export const IMPRESS_MAIN_COMMENT = 'IMPRESS_MAIN_COMMENT';
export const UNIMPRESS_MAIN_COMMENT = 'UNIMPRESS_MAIN_COMMENT';
export const IMPRESS_SIDE_COMMENT = 'IMPRESS_SIDE_COMMENT';
export const UNIMPRESS_SIDE_COMMENT = 'UNIMPRESS_SIDE_COMMENT';
export const SET_FAVOURITE = 'SET_FAVOURITE';
export const SET_IMPRESSED = 'SET_IMPRESSED';

// Export Actions

export function addTriptory(triptory, userid, index) {
  return {
    type: ADD_TRIPTORY,
    triptory,
    userid,
    index,
  };
}

export function addTriptoryList(posts) {
  return {
    type: ADD_TRIPTORY_LIST,
    posts,
  };
}

export function addNewsFeedList(feed) {
  return {
    type: ADD_NEWS_FEED_LIST,
    feed,
  };
}

export function addBestFeedList(feed) {
  return {
    type: ADD_BEST_FEED_LIST,
    feed,
  };
}

export function addUserFeedList(feed) {
  return {
    type: ADD_USER_FEED_LIST,
    feed,
  };
}

export function addFavouriteFeedList(feed) {
  return {
    type: ADD_FAVOURITE_FEED_LIST,
    feed,
  };
}

export function addTriptoryFullComment(comments, userid, index) {
  return {
    type: ADD_TRIPTORY_FULL_COMMENT,
    comments,
    userid,
    index,
  };
}

export function addTriptorySideComment(comments, userid, index, serverIdx) {
  return {
    type: ADD_TRIPTORY_SIDE_COMMENT,
    comments,
    userid,
    index,
    serverIdx,
  };
}

export function addTriptorySingleComment(comment, userid, index) {
  return {
    type: ADD_TRIPTORY_SINGLE_COMMENT,
    comment,
    userid,
    index,
  };
}

export function addComponentSingleComment(comment, userid, index, serverIdx) {
  return {
    type: ADD_COMPONENT_SINGLE_COMMENT,
    comment,
    userid,
    index,
    serverIdx,
  };
}


export function deleteTriptorySingleComment(userid, index, id) {
  return {
    type: DELETE_TRIPTORY_SINGLE_COMMENT,
    userid,
    index,
    id,
  };
}

export function deleteComponentSingleComment(userid, index, serverIdx, id) {
  return {
    type: DELETE_COMPONENT_SINGLE_COMMENT,
    userid,
    index,
    serverIdx,
    id,
  };
}

export function impressMainCommentReduce(userid, index, id, loginUser) {
  return {
    type: IMPRESS_MAIN_COMMENT,
    userid,
    index,
    id,
    loginUser,
  };
}

export function unimpressMainCommentReduce(userid, index, id, loginUser) {
  return {
    type: UNIMPRESS_MAIN_COMMENT,
    userid,
    index,
    id,
    loginUser,
  };
}

export function impressSideCommentReduce(userid, index, serverIdx, id, loginUser) {
  return {
    type: IMPRESS_SIDE_COMMENT,
    userid,
    index,
    serverIdx,
    id,
    loginUser,
  };
}

export function unimpressSideCommentReduce(userid, index, serverIdx, id, loginUser) {
  return {
    type: UNIMPRESS_SIDE_COMMENT,
    userid,
    index,
    serverIdx,
    id,
    loginUser,
  };
}

export function fetchTriptory(userid, index) {
  return (dispatch) => {
    return callApi('webgettriptory', 'post', {
      userid, index,
    }).then(res => {
      if (!res.error) {
        dispatch(addTriptory(res, userid, index));
      }
    });
  };
}

export function fetchNewsFeed(userid) {
  return (dispatch) => {
    return callApi('webgetnewsfeed', 'post', {
      userid,
    }).then(res => {
      dispatch(addNewsFeedList(res));
    });
  };
}

export function fetchBestFeed() {
  return (dispatch) => {
    return callApi('webgetbestfeed', 'post', {}).then((result) => {
      dispatch(addBestFeedList(result));
    });
  };
}

export function fetchUserFeed(userid) {
  return (dispatch) => {
    return callApi('webgetuserfeed', 'post', { userid }).then((result) => {
      dispatch(addUserFeedList(result));
    });
  };
}

export function fetchFavouriteFeed(userid) {
  return (dispatch) => {
    return callApi('webgetfavouritefeed', 'post', { userid }).then((result) => {
      dispatch(addFavouriteFeedList(result));
    });
  };
}

export function setImpressed(userid, index, impressValue, next) {
  return (dispatch) => {
    return callApi('webtoggleimpressed', 'post', {
      userid, index, impressValue,
    }).then(result => {
      if (result.status) {
        dispatch({
          type: SET_IMPRESSED,
          userid,
          index,
          value: result.newValue,
          userToAdd: result.userToAdd,
        });
        next(result.status);
      } else {
        next(result.error);
      }
    });
  };
}

export function setFavourited(userid, index, favouriteValue, next) {
  return (dispatch) => {
    return callApi('webtogglefavourited', 'post', {
      userid, index, favouriteValue,
    }).then(result => {
      if (result.status) {
        dispatch({
          type: SET_FAVOURITE,
          userid,
          index,
          value: result.newValue,
          userToAdd: result.userToAdd,
        });
        next(result.status);
      } else {
        next(result.error);
      }
    });
  };
}

export function fetchMainComment(userid, index) {
  return (dispatch) => {
    return callApi('webgetcomment', 'post', {
      userid,
      index,
      type: -1,
    }).then(res => {
      dispatch(addTriptoryFullComment(res.data, userid, index));
    });
  };
}

export function fetchSideComment(userid, index, serverIdx, type) {
  return (dispatch) => {
    let newType = -2;
    switch (type) {
      case 'NOTE': {
        newType = 0;
        break;
      }
      case 'PICTURE': {
        newType = 1;
        break;
      }
      case 'MOVIE': {
        newType = 2;
        break;
      }
      case 'RECORD': {
        newType = 3;
        break;
      }
      default: {
        console.log('ERROR: Invalid type');
        return false;
      }
    }
    return callApi('webgetcomment', 'post', {
      userid,
      index: serverIdx,
      type: newType,
    }).then(res => {
      dispatch(addTriptorySideComment(res.data, userid, index, serverIdx));
    });
  };
}

export function addCommentToTriptory(userid, index, comment,
                                     loginUser, loginUserProfilePic, next) {
  return (dispatch) => {
    return callApi('webaddcommenttotriptory', 'post', {
      userid,
      index,
      comment,
      type: 'TRIPTORY',
    }).then(res => {
      const newComment = {
        _id: res.id,
        userid: loginUser,
        comment,
        regDate: res.regDate,
        impressed: [],
        impressedNum: 0,
        isImpressed: false,
        formattedDate: res.formattedDate,
        profilePic: loginUserProfilePic,
      };
      dispatch(addTriptorySingleComment(newComment, userid, index));
      next();
    });
  };
}

export function addCommentToComponent(userid, index, serverIdx, type, comment,
                                      loginUser, loginUserProfilePic, next) {
  return (dispatch) => {
    return callApi('webaddcommenttotriptory', 'post', {
      userid,
      index: serverIdx,
      comment,
      type,
    }).then(res => {
      const newComment = {
        _id: res.id,
        userid: loginUser,
        comment,
        regDate: res.regDate,
        impressed: [],
        impressedNum: 0,
        isImpressed: false,
        formattedDate: res.formattedDate,
        profilePic: loginUserProfilePic,
      };
      dispatch(addComponentSingleComment(newComment, userid, index, serverIdx));
      next();
    });
  };
}

export function deleteComment(commentUserid, contentUserid, index, id) {
  return (dispatch) => {
    return callApi('webremovecomment', 'post', {
      commentUserid,
      contentUserid,
      index,
      id,
      type: 'TRIPTORY',
    }).then((res) => {
      if (res.result) {
        dispatch(deleteTriptorySingleComment(contentUserid, index, id));
      } else {
        console.log(res.error);
      }
    });
  };
}

export function deleteSideComment(commentUserid, contentUserid, triptoryIndex, componentIndex, id, type) {
  return (dispatch) => {
    return callApi('webremovecomment', 'post', {
      commentUserid,
      contentUserid,
      index: componentIndex,
      id,
      type,
    }).then((res) => {
      if (res.result) {
        dispatch(deleteComponentSingleComment(contentUserid, triptoryIndex, componentIndex, id));
      } else {
        console.log(res.error);
      }
    });
  };
}

export function impressMainComment(userid, index, id, loginUser, next) {
  return (dispatch) => {
    return callApi('webimpresscomment', 'post', {
      id,
    }).then((res) => {
      if (res.result) {
        dispatch(impressMainCommentReduce(userid, index, id, loginUser));
        if (next) {
          next(true);
        }
      } else {
        console.log(res.error);
      }
    });
  };
}

export function unimpressMainComment(userid, index, id, loginUser, next) {
  return (dispatch) => {
    return callApi('webunimpresscomment', 'post', {
      id,
    }).then((res) => {
      if (res.result) {
        dispatch(unimpressMainCommentReduce(userid, index, id, loginUser));
        if (next) {
          next(true);
        }
      } else {
        console.log(res.error);
      }
    });
  };
}

export function impressSideComment(userid, index, serverIdx, id, loginUser, next) {
  return (dispatch) => {
    return callApi('webimpresscomment', 'post', {
      id,
    }).then((res) => {
      if (res.result) {
        dispatch(impressSideCommentReduce(userid, index, serverIdx, id, loginUser));
        if (next) {
          next(true);
        }
      } else {
        console.log(res.error);
      }
    });
  };
}

export function unimpressSideComment(userid, index, serverIdx, id, loginUser, next) {
  return (dispatch) => {
    return callApi('webunimpresscomment', 'post', {
      id,
    }).then((res) => {
      if (res.result) {
        dispatch(unimpressSideCommentReduce(userid, index, serverIdx, id, loginUser));
        if (next) {
          next(true);
        }
      } else {
        console.log(res.error);
      }
    });
  };
}

export function getProfilePic(userid, next) {
  return () => {
    return callApi(`webgetprofilepic?userid=${userid}`).then((result) => {
      if (result.data) {
        next(result.data);
      } else {
        console.log(result.error);
      }
    });
  };
}
