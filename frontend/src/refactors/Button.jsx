import React from "react";

const Button = ({ className, color, text, ...rest }) => {
  return (
    <button className={className} color={color} {...rest}>
      {text}
    </button>
  );
};

export default Button;
