import React, { FunctionComponent, LiHTMLAttributes } from "react";
import clsx from "clsx";
import Document from "../Icons/Document";

export interface FileListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  active?: boolean;
  fileName: string;
  desc: string;
  className?: string;
}

const FileListItem: FunctionComponent<FileListItemProps> = ({
  active,
  fileName,
  desc,
  className,
  ...props
}) => {
  return (
    <li
      className={clsx("file", active && "file--active", className)}
      {...props}
    >
      <div className="file__icon">
        <Document />
      </div>
      <div className="file__display">
        <p className="file__name">{fileName}</p>
        <span className="file__desc">{desc}</span>
      </div>
    </li>
  );
};

export default FileListItem;
