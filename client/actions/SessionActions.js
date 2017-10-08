import { browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import callApi from '../util/apiCaller';

export function loginRequest(info, next) {
  return () => {
    return callApi('weblogin', 'post', {
      userid: info.userid,
      password: info.password,
    }).then(res => {
      if (res.status) {
        const { token } = res;
        sessionService.saveSession({ token }).then(() => {
          sessionService.saveUser(res.data).then(() => {
            browserHistory.replace('/');
          });
        });
        next('');
      } else {
        next(res.error);
      }
    });
  };
}

export function signupRequest(info, next) {
  return () => {
    return callApi('websignup', 'post', {
      userid: info.userid,
      nickname: info.nickname,
      password: info.password,
      passwordConfirm: info.passwordConfirm,
      email: info.email,
    }).then(res => {
      console.log(res);
      if (res.status) {
        next('');
      } else {
        next(res.error);
      }
    });
  };
}

export function logoutRequest(next) {
  return callApi('weblogout', 'post', {}).then((res) => {
    if (res.status) {
      sessionService.deleteSession();
      sessionService.deleteUser();
      browserHistory.replace('/');
      next('');
    } else {
      next(res.error);
    }
  });
}

export function authRequest() {
  return callApi('webauthenticate', 'post', {}).then((res) => {
    console.log(res);
    if (res.status === 'login') {
      console.log('Logged in!');
      const token = res.data.token;
      sessionService.saveSession({ token }).then(() => {
        const data = {
          userid: res.data.userid,
          profilePic: res.data.profilePic,
        };
        sessionService.saveUser(data);
      });
    } else if (res.status === 'logout') {
      console.log('Not logged in!');
      sessionService.deleteSession();
      sessionService.deleteUser();
    }
  });
}

export function softAuthRequest(next) {
  return callApi('webauthenticate', 'post', {}).then((res) => {
    if (res.status === 'login') {
      next(true);
    } else {
      next(false);
    }
  });
}

