import MobileDetect from 'mobile-detect';
import routes from '../../client/routes';
import mobileRoutes from '../../client/routesMobile';

export default function fetchRoutes(userAgent, cookie) {
  const md = new MobileDetect(userAgent);
  if ((md.mobile() || md.phone() || md.tablet()) && cookie['force-desktop']
      && cookie['force-desktop'] === 'false') {
    return mobileRoutes;
  } else {
    return routes;
  }
}
