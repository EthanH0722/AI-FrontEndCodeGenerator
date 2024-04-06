import React from "react";

const HtmlRender = ({ htmlCode }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlCode }} />;
};

export default HtmlRender;
