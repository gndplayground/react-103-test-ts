import React, { FunctionComponent } from "react";
import clsx from "clsx";
import Document from "../Icons/Document";

export interface FileListItemProps {
  active?: boolean;
  fileName: string;
  desc: string;
  className?: string;
}

const FileListItem: FunctionComponent<FileListItemProps> = ({
  active,
  fileName,
  desc,
  className
}) => {
  return (
    <li className={clsx("file", active && "file--active", className)}>
      <div className="file__icon">
        <Document />
      </div>
      <div>
        <p className="file__name">{fileName}</p>
        <span className="file__desc">{desc}</span>
      </div>
    </li>
  );
};

export default FileListItem;
