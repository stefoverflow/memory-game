import React from "react";
import Redirect from "router/components/Redirect";

const redirect =
  (path: string, absolute = false) =>
  () =>
    <Redirect to={path} absolute={absolute} />;

export default redirect;
