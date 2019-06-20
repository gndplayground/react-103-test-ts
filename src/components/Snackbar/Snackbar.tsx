import React, {
  AllHTMLAttributes,
  FunctionComponent,
  ReactNode,
  Fragment
} from "react";
import clsx from "clsx";

export enum SnackbarVariant {
  Error = "error",
  Success = "success"
}

export interface SnackbarProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: SnackbarVariant;
  renderIcon?: ReactNode;
  children: ReactNode;
}

const Snackbar: FunctionComponent<SnackbarProps> = ({
  variant,
  children,
  className,
  renderIcon,
  ...rest
}: SnackbarProps) => {
  return (
    <div
      {...rest}
      className={clsx(
        "snackbar",
        variant === SnackbarVariant.Error && "snackbar--error",
        variant === SnackbarVariant.Success && "snackbar--success",
        className
      )}
    >
      {renderIcon && (
        <Fragment>
          <span className="snackbar__icon">{renderIcon}</span>
          <span>{children}</span>
        </Fragment>
      )}
      {!renderIcon && children}
    </div>
  );
};

export default Snackbar;
