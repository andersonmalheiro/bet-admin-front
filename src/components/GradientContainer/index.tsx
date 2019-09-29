import * as React from "react";

import "./style.css";

interface Props {
  children: React.ReactNode;
}

const GradientContainer = (props: Props) => {
  return (
    <div className="main-bg">
      <div className="container">{props.children}</div>
    </div>
  );
};

export default GradientContainer;
