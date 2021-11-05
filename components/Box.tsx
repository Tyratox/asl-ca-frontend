import { Children, FunctionComponent } from "react";
import React from "react";

type WidthType = "full" | "half-on-large" | "header-small" | "header-large";

const Box: FunctionComponent<{
  width: WidthType;
  paddingRight?: boolean;
  paddingLeft?: boolean;
}> = React.memo(({ width, paddingRight, paddingLeft, children }) => {
  const paddings: string[] = [];

  if (paddingRight) {
    paddings.push("padding-right");
  }

  if (paddingLeft) {
    paddings.push("padding-left");
  }

  return (
    <div className={`box width-${width} ${paddings.join(" ")}`}>{children}</div>
  );
});

export default Box;
