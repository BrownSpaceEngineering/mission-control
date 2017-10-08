import { ADD_NEWS_FEED_LIST,
         ADD_BEST_FEED_LIST,
         ADD_USER_FEED_LIST,
         ADD_FAVOURITE_FEED_LIST,
         ADD_TRIPTORY,
         ADD_TRIPTORY_FULL_COMMENT,
         ADD_TRIPTORY_SIDE_COMMENT,
         ADD_TRIPTORY_SINGLE_COMMENT,
         ADD_COMPONENT_SINGLE_COMMENT,
         DELETE_TRIPTORY_SINGLE_COMMENT,
         DELETE_COMPONENT_SINGLE_COMMENT,
         IMPRESS_MAIN_COMMENT,
         UNIMPRESS_MAIN_COMMENT,
         IMPRESS_SIDE_COMMENT,
         UNIMPRESS_SIDE_COMMENT,
         SET_FAVOURITE,
         SET_IMPRESSED,
         ADD_FRIENDS } from '../actions/ContentActions';

// Initial State
const initialState = {
  newsFeed: [],
  bestFeed: null,
  userFeed: null,
  favouriteFeed: null,
  triptory: {},
};

const ContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS_FEED_LIST : {
      const newTriptory = Object.assign({}, state.triptory);
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        if (!newTriptory[each.userid]) {
          newTriptory[each.userid] = {};
        }
        if (!newTriptory[each.userid][each.index]) {
          newTriptory[each.userid][each.index] = {};
        }
        let newTriptoryEach = Object.assign({}, newTriptory[each.userid][each.index]);
        newTriptoryEach = Object.assign(newTriptoryEach, each);
        newTriptory[each.userid][each.index] = newTriptoryEach;
      }

      const newNewsFeed = [];
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        newNewsFeed.push({ userid: each.userid, index: each.index });
      }

      return {
        newsFeed: newNewsFeed,
        triptory: newTriptory,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_BEST_FEED_LIST : {
      const newTriptory = Object.assign({}, state.triptory);
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        if (!newTriptory[each.userid]) {
          newTriptory[each.userid] = {};
        }
        if (!newTriptory[each.userid][each.index]) {
          newTriptory[each.userid][each.index] = {};
        }
        let newTriptoryEach = Object.assign({}, newTriptory[each.userid][each.index]);
        newTriptoryEach = Object.assign(newTriptoryEach, each);
        newTriptory[each.userid][each.index] = newTriptoryEach;
      }

      const newBestFeed = [];
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        newBestFeed.push({ userid: each.userid, index: each.index });
      }

      return {
        newsFeed: state.newsFeed,
        triptory: newTriptory,
        bestFeed: newBestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_USER_FEED_LIST : {
      const newTriptory = Object.assign({}, state.triptory);
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        if (!newTriptory[each.userid]) {
          newTriptory[each.userid] = {};
        }
        if (!newTriptory[each.userid][each.index]) {
          newTriptory[each.userid][each.index] = {};
        }
        let newTriptoryEach = Object.assign({}, newTriptory[each.userid][each.index]);
        newTriptoryEach = Object.assign(newTriptoryEach, each);
        newTriptory[each.userid][each.index] = newTriptoryEach;
      }

      const newUserFeed = [];
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        newUserFeed.push({ userid: each.userid, index: each.index });
      }

      return {
        newsFeed: state.newsFeed,
        triptory: newTriptory,
        bestFeed: state.bestFeed,
        userFeed: newUserFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_FAVOURITE_FEED_LIST : {
      const newTriptory = Object.assign({}, state.triptory);
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        if (!newTriptory[each.userid]) {
          newTriptory[each.userid] = {};
        }
        if (!newTriptory[each.userid][each.index]) {
          newTriptory[each.userid][each.index] = {};
        }
        let newTriptoryEach = Object.assign({}, newTriptory[each.userid][each.index]);
        newTriptoryEach = Object.assign(newTriptoryEach, each);
        newTriptory[each.userid][each.index] = newTriptoryEach;
      }

      const newFavouriteFeed = [];
      for (let i = 0; i < action.feed.triptory.length; i++) {
        const each = action.feed.triptory[i];
        newFavouriteFeed.push({ userid: each.userid, index: each.index });
      }

      return {
        newsFeed: state.newsFeed,
        triptory: newTriptory,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: newFavouriteFeed,
      };
    }

    case ADD_TRIPTORY : {
      const newTriptory = Object.assign({}, state.triptory);
      if (!newTriptory[action.userid]) {
        newTriptory[action.userid] = {};
      }
      if (!newTriptory[action.userid][action.index]) {
        newTriptory[action.userid][action.index] = {};
      }
      newTriptory[action.userid][action.index] = Object.assign(newTriptory[action.userid][action.index], action.triptory);
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_TRIPTORY_FULL_COMMENT: {
      const newTriptoryComments = Object.assign({}, state.triptory);
      if (!newTriptoryComments[action.userid]) {
        newTriptoryComments[action.userid] = {};
      }
      if (!newTriptoryComments[action.userid][action.index]) {
        newTriptoryComments[action.userid][action.index] = {};
        newTriptoryComments[action.userid][action.index].comments = action.comments;
      }
      newTriptoryComments[action.userid][action.index].comments = action.comments;
      return {
        triptory: newTriptoryComments,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_TRIPTORY_SIDE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      if (!newTriptory[action.userid]) {
        newTriptory[action.userid] = {};
      }

      if (!newTriptory[action.userid][action.index]) {
        newTriptory[action.userid][action.index] = {};
      }

      if (!newTriptory[action.userid][action.index].content) {
        newTriptory[action.userid][action.index].content = [];
      }

      const newTriptoryContent = newTriptory[action.userid][action.index].content;

      for (let i = 0; i < newTriptoryContent.length; i++) {
        if (newTriptoryContent[i].serverIdx === action.serverIdx) {
          newTriptoryContent[i].comments = action.comments;
        }
      }

      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_TRIPTORY_SINGLE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      if (!newTriptory[action.userid]) {
        newTriptory[action.userid] = {};
      } else {
        newTriptory[action.userid] = Object.assign({}, state.triptory[action.userid]);
      }

      if (!newTriptory[action.userid][action.index]) {
        newTriptory[action.userid][action.index] = {};
      } else {
        newTriptory[action.userid][action.index] = Object.assign({}, state.triptory[action.userid][action.index]);
      }

      if (!newTriptory[action.userid][action.index].comments) {
        newTriptory[action.userid][action.index].comments = [];
      } else {
        newTriptory[action.userid][action.index].comments = state.triptory[action.userid][action.index].comments.slice();
      }

      newTriptory[action.userid][action.index].comments.push(action.comment);

      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_COMPONENT_SINGLE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      if (!newTriptory[action.userid]) {
        newTriptory[action.userid] = {};
      } else {
        newTriptory[action.userid] = Object.assign({}, newTriptory[action.userid]);
      }

      if (!newTriptory[action.userid][action.index]) {
        newTriptory[action.userid][action.index] = {};
      } else {
        newTriptory[action.userid][action.index] = Object.assign({}, newTriptory[action.userid][action.index]);
      }

      if (!newTriptory[action.userid][action.index].content) {
        newTriptory[action.userid][action.index].content = [];
      } else {
        newTriptory[action.userid][action.index].content = newTriptory[action.userid][action.index].content.slice();
      }

      const newTriptoryContent = newTriptory[action.userid][action.index].content;

      for (let i = 0; i < newTriptoryContent.length; i++) {
        if (newTriptoryContent[i].serverIdx === action.serverIdx) {
          if (!newTriptoryContent[i].comments) {
            newTriptoryContent[i].comments = [];
          } else {
            newTriptoryContent[i].comments = newTriptoryContent[i].comments.slice();
          }

          newTriptoryContent[i].comments.push(action.comment);
        }
      }

      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case DELETE_TRIPTORY_SINGLE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const comments = newTriptory[action.userid][action.index].comments;
      const newComments = [];
      for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id !== action.id) {
          newComments.push(comments[i]);
        }
      }
      newTriptory[action.userid][action.index].comments = newComments;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case DELETE_COMPONENT_SINGLE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const newTriptoryContent = newTriptory[action.userid][action.index].content;

      for (let i = 0; i < newTriptoryContent.length; i++) {
        if (newTriptoryContent[i].serverIdx === action.serverIdx) {
          const comments = newTriptoryContent[i].comments;
          const newComments = [];
          for (let j = 0; j < comments.length; j++) {
            if (comments[j]._id !== action.id) {
              newComments.push(comments[j]);
            }
          }
          newTriptoryContent[i].comments = newComments;
        }
      }
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case IMPRESS_MAIN_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const comments = newTriptory[action.userid][action.index].comments.slice();
      for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === action.id) {
          comments[i].impressed.push(action.loginUser);
          comments[i].impressedNum++;
          comments[i].isImpress = true;
        }
      }
      newTriptory[action.userid][action.index].comments = comments;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case UNIMPRESS_MAIN_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const comments = newTriptory[action.userid][action.index].comments.slice();
      for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === action.id) {
          comments[i].impressed = comments[i].impressed.filter(e => e !== action.loginUser);
          comments[i].impressedNum--;
          comments[i].isImpress = false;
        }
      }
      newTriptory[action.userid][action.index].comments = comments;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case IMPRESS_SIDE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const newTriptoryContent = newTriptory[action.userid][action.index].content.slice();

      for (let i = 0; i < newTriptoryContent.length; i++) {
        if (newTriptoryContent[i].serverIdx === action.serverIdx) {
          const comments = newTriptoryContent[i].comments.slice();
          for (let j = 0; j < comments.length; j++) {
            if (comments[j]._id === action.id) {
              comments[j].impressed.push(action.loginUser);
              comments[j].impressedNum++;
              comments[j].isImpress = true;
            }
          }
          newTriptoryContent[i].comments = comments;
        }
      }
      newTriptory[action.userid][action.index].content = newTriptoryContent;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case UNIMPRESS_SIDE_COMMENT: {
      const newTriptory = Object.assign({}, state.triptory);
      const newTriptoryContent = newTriptory[action.userid][action.index].content.slice();

      for (let i = 0; i < newTriptoryContent.length; i++) {
        if (newTriptoryContent[i].serverIdx === action.serverIdx) {
          const comments = newTriptoryContent[i].comments.slice();
          for (let j = 0; j < comments.length; j++) {
            if (comments[j]._id === action.id) {
              comments[j].impressed = comments[i].impressed.filter(e => e !== action.loginUser);
              comments[j].impressedNum--;
              comments[j].isImpress = false;
            }
          }
          newTriptoryContent[i].comments = comments;
        }
      }
      newTriptory[action.userid][action.index].content = newTriptoryContent;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case SET_FAVOURITE: {
      const newTriptory = Object.assign({}, state.triptory);
      newTriptory[action.userid][action.index] = Object.assign({}, newTriptory[action.userid][action.index]);
      const newFavourited = newTriptory[action.userid][action.index].favourited.slice();
      if (action.value) {
        newFavourited.push(action.userToAdd);
      } else {
        newFavourited.splice(newFavourited.indexOf(action.userToAdd), 1);
      }
      newTriptory[action.userid][action.index].favourited = newFavourited;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case SET_IMPRESSED: {
      const newTriptory = Object.assign({}, state.triptory);
      newTriptory[action.userid][action.index] = Object.assign({}, newTriptory[action.userid][action.index]);
      const newImpressed = newTriptory[action.userid][action.index].impressed.slice();
      if (action.value) {
        newImpressed.push(action.userToAdd);
      } else {
        newImpressed.splice(newImpressed.indexOf(action.userToAdd), 1);
      }
      newTriptory[action.userid][action.index].impressed = newImpressed;
      return {
        triptory: newTriptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    case ADD_FRIENDS: {
      return {
        triptory: state.triptory,
        newsFeed: state.newsFeed,
        bestFeed: state.bestFeed,
        userFeed: state.userFeed,
        favouriteFeed: state.favouriteFeed,
      };
    }

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getNewsFeed = state => state.content.newsFeed;

// Get triptory
export const getTriptory = state => state.content.triptory;

// Get all best posts
export const getBestFeed = state => state.content.bestFeed;

// Get all user posts
export const getUserFeed = state => state.content.userFeed;

// Get all favourite posts
export const getFavouriteFeed = state => state.content.favouriteFeed;

// Export Reducer
export default ContentReducer;
