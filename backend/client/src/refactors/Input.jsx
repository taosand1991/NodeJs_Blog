import React, { Fragment } from "react";

const Input = ({
  className,
  prepend_class,
  type,
  text,
  id,
  label,
  name,
  children,
  placeholder,
  prepend,
  label_class,
  value,
  ...rest
}) => {
  if (prepend) {
    children = React.createElement("i", { className: prepend_class }, text);
    return (
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{children}</div>
        </div>
        <input
          {...rest}
          className={className}
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
        ></input>
      </div>
    );
  } else {
    return (
      <Fragment>
        <label className={label_class} htmlFor={id}>
          {label}
        </label>
        <input
          {...rest}
          className={className}
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
        ></input>
      </Fragment>
    );
  }
};
export default Input;
