import React from "react";
import "./app.scss";
import logo from "./images/logo_sm_white.png";
import Sidebar from "./components/Sidebar";
import DocumentTitleIcon from "./components/Icons/DocumentTitle";

const App = () => {
  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar logo={logo} />
      </div>
      <main className="content">
        <div className="content__head">
          <span>
            <DocumentTitleIcon />
          </span>
          <h1 className="content__title">
            This HTML file is a template. If you open it directly in the
            browser, you will see an empty page. You can add webfonts, meta
            tags, or analytics to this file. The build step will place the
            bundled scripts into the tag. To begin the development, run `npm
            start` or `yarn start`. To create a production bundle, use `npm run
            build` or `yarn build`. 1
          </h1>
        </div>
      </main>
    </div>
  );
};

export default App;
