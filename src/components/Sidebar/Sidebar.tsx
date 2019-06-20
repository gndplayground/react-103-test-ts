import React, { FunctionComponent, useState } from "react";
import FileListItem from "../FileListItem";
import UploadButton from "../UploadButton";
import Document from "../Icons/Document";
import clsx from "clsx";

export interface FileItem {
  id: number;
  name: string;
  desc: string;
}

export interface SidebarProps {
  logo: string;
  onUploadTextFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listFiles?: Array<FileItem>;
  selectedFile?: number;
  onSelectFile?: (id: number) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({
  logo,
  onUploadTextFile,
  listFiles,
  selectedFile,
  onSelectFile
}) => {
  // Mobile toggle
  const [isOpen, setIsOpen] = useState(false);

  function handleClickFile(id: number) {
    return () => {
      if (onSelectFile) {
        onSelectFile(id);
      }
    };
  }

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <aside className={clsx("sidebar", isOpen && "sidebar--open")}>
      <button
        className={clsx("sidebar__toggle", isOpen && "sidebar__toggle--open")}
        onClick={toggleSidebar}
      >
        <Document />
      </button>
      <div className="sidebar__content">
        <div className="sidebar__logo">
          <img src={logo} alt="log" />
        </div>
        <div className="sidebar__list">
          <p className="sidebar__list-label">Files</p>
          {listFiles && (
            <ul className="sidebar__files">
              {listFiles.map(f => (
                <FileListItem
                  onClick={handleClickFile(f.id)}
                  key={f.id}
                  active={Boolean(selectedFile && selectedFile === f.id)}
                  fileName={f.name}
                  desc={f.desc}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="sidebar__upload">
          <UploadButton
            inputProps={{
              onChange: onUploadTextFile
            }}
            id="upload"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
