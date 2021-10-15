import React from "react";
import "./LayoutWrapper.styles.scss";

type LayoutWrapperProps = {};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return <div className="layout-wrapper-root">{children}</div>;
};

export default LayoutWrapper;
