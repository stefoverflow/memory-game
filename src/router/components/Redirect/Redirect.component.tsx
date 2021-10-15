import React, { useMemo } from 'react';
import {
  useRouteMatch,
  Redirect as ReactRedirect,
  RedirectProps as ReactRedirectProps,
} from 'react-router-dom';

export type RedirectProps = ReactRedirectProps & {
  absolute?: boolean;
};

const Redirect: React.FC<RedirectProps> = (props) => {
  const { to, absolute = false } = props;
  const { url } = useRouteMatch();

  const finalPath = useMemo(() => {
    if (absolute) return to;
    const { length: urlLength } = url;
    const toString = to as string;
    if (url[urlLength - 1] === toString[0] && toString[0] === '/') {
      return url + toString.slice(1);
    }
    return url + to;
  }, [url, to, absolute]);

  return <ReactRedirect to={finalPath} />;
};

export default Redirect;
