import React, { FunctionComponent, InputHTMLAttributes } from "react";
import clsx from "clsx";
import CloudSave from "../Icons/CloudSave";

export interface ButtonProps {
  id: string;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const UploadButton: FunctionComponent<ButtonProps> = ({
  className,
  inputProps,
  id
}) => {
  return (
    <div className={clsx("upload", className)}>
      <label htmlFor={id} className="upload__button">
        <div className="upload__icon">
          <CloudSave />
        </div>
        <span>Upload Files</span>
      </label>
      <input {...inputProps} type="file" id={id} />
    </div>
  );
};

export default UploadButton;
