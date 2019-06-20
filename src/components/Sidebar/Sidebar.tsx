import React, { FunctionComponent } from "react";
import FileListItem from "../FileListItem";
import UploadButton from "../UploadButton";

export interface SidebarProps {
  logo: string;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ logo }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__logo">
          <img src={logo} alt="log" />
        </div>
        <div className="sidebar__list">
          <p className="sidebar__list-label">Files</p>
          <ul className="sidebar__files">
            <FileListItem
              active={true}
              fileName="Document 1"
              desc="lore ispum"
            />
            <FileListItem
              active={false}
              fileName="Document 2"
              desc="lore ispum"
            />
            <FileListItem
              active={false}
              fileName="Document 2"
              desc="lore ispum"
            />
            <FileListItem
              active={false}
              fileName="Document 2"
              desc="lore ispum"
            />
            <FileListItem
              active={false}
              fileName="Document 2"
              desc="lore ispum"
            />
            <FileListItem
              active={false}
              fileName="Document 2"
              desc="lore ispum"
            />
          </ul>
        </div>
        <div className="sidebar__upload">
          <UploadButton id="upload" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
