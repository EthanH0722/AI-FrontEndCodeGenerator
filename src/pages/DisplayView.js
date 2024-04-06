import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Label } from "reactstrap";
import CodeInput from "./CodeInput";
import HtmlRender from "./HtmlRender";

const DisplayView = () => {
  const { state } = useLocation();
  const { code } = state;
  const [htmlCode, setHtmlCode] = useState(code);
  const updateHtmlCode = (code) => {
    setHtmlCode(code);
  };

  return (
    <div className="horizontal-views">
      <div className="horizontal-view">
        {/* Content for the first horizontal view */}
        <h2>HTML Source Code</h2>
        <Label>This is the content for the html source code:</Label>
        <CodeInput updateHtmlCode={updateHtmlCode} initialCode={htmlCode} />
      </div>
      <div className="horizontal-view">
        {/* Content for the second horizontal view */}
        <h2>Rendered HTML</h2>
        <Label>This is the content for the rendered html:</Label>
        <HtmlRender htmlCode={htmlCode} />
      </div>
    </div>
  );
};

export default DisplayView;
