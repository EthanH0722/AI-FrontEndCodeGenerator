import React, { useState } from "react";
import { Input } from "reactstrap";

function CodeInput({ updateHtmlCode, initialCode }) {
  const [code, setCode] = useState(initialCode);

  const handleChange = (event) => {
    setCode(event.target.value);
    updateHtmlCode(event.target.value);
  };

  return (
    <form>
      <Input
        type="textarea"
        name="text"
        id="exampleText"
        value={code}
        onChange={handleChange}
        rows={20}
        // style={{ height: "100%" }}
      />
    </form>
  );
}

export default CodeInput;
