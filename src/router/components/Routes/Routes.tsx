import React, { useCallback } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { Route as RouteModel } from 'models/Route';

type RoutesProps = {
  routes: RouteModel[];
};
const Routes: React.FC<RoutesProps> = ({ routes }) => {
  const { url } = useRouteMatch();

  const finalPath = useCallback(
    (to = '') => {
      const { length } = url;
      if (url[length - 1] === to[0] && to[0] === '/') {
        return url + to.slice(1);
      }
      return url + to;
    },
    [url],
  );

  return (
    <Switch>
      {routes.map(({ path, exact = true, component: Component, ...rest }) => (
        <Route
          key={`${path}`}
          path={finalPath(path)}
          exact={exact}
          render={(props) => <Component {...props} {...rest} />}
        />
      ))}
    </Switch>
  );
};

export default Routes;
