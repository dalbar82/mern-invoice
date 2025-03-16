import React from "react";
import './box.css'

type BoxProps = {
  children?: React.ReactNode,
  style?: React.CSSProperties
}

const Box: React.FC<BoxProps> = ({children, style}) => {
  return (
    <div className="box" style={style}>
      {children}
    </div>
  )
};

export default Box;
