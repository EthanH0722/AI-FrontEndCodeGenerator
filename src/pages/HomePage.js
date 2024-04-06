import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Col, FormGroup, Label, Input, Spinner } from "reactstrap";
import axios from "axios";

function replaceImageSrc(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const imgTags = doc.getElementsByTagName("img");

  for (let i = 0; i < imgTags.length; i++) {
    const imgTag = imgTags[i];
    const src = imgTag.getAttribute("src");

    if (!src || src.trim() === "") {
      imgTag.setAttribute("src", "http://via.placeholder.com/640x360");
    }
  }

  return doc.documentElement.outerHTML;
}

const HomePage = () => {
  const navigate = useNavigate();

  let [theme, setTheme] = useState(
    "Give me a landing page of a coffee shop"
  );
  const [htmlCode, setHtmlCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: " Nav Bar", value: " navigation bar", checked: true },
    {
      id: 2,
      label: " Features Introduction",
      value: " features introduction",
      checked: true,
    },
    { id: 3, label: " Price Plan", value: " price plan", checked: true },
    { id: 4, label: " Footer", value: " footer", checked: true },
  ]);

  useEffect(() => {
    console.log("useEffect....");
    console.log(htmlCode);
    if (htmlCode.length !== 0) {
      navigate("/result", { state: { code: htmlCode } });
    }
  }, [htmlCode, navigate]);

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleChange = (event) => {
    setTheme(event.target.value);
  };
  const handleClickGoButton = () => {
    console.log("handleClickGoButton...");
    if (theme.length === 0) {
      alert("Please fill the website theme first");
      return;
    }

    // Save the values of the selected checkboxes and add them to the theme
    const selectedCheckboxes = checkboxes.filter(
      (checkbox) => checkbox.checked
    );
    const selectedValues = selectedCheckboxes.map((checkbox) => checkbox.value);
    console.log("Selected Checkboxes:", selectedValues);

    const checkedSections =
      selectedValues.length === 0
        ? ""
        : "Remeber, these " +
          selectedValues.join(",") +
          " sections should be included in the html.";
    const instruction =
      "Please generate a html with inline css. It would be great if you can put some image tags here although the link could be empty.";

    theme = instruction + " " + theme + ", provide html code integrated with style. " + checkedSections;

    console.log(theme);
    fetchData();
  };

  const fetchData = () => {
    const url = "http://3.88.181.187:8080/v1/";
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: theme,
        },
      ],
    };
    setLoading(true); // Set loading before sending API request
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        // Handle successful response
        setLoading(false); // Stop loading
        console.log(res.data);
        let fullResponse = res.data.choices[0].message.content;
        let startIndex = fullResponse.indexOf("<!DOCTYPE html>");
        let endIndex = fullResponse.indexOf("</html>");
        const html_content =
          fullResponse.substring(startIndex, endIndex) + "</html>";

        const html_with_image_placeholder = replaceImageSrc(html_content);
        setHtmlCode(html_with_image_placeholder);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <>
      <body class="container bg-dark text-white">
        <header>
          <h1>BlossomLand</h1>
        </header>
        <div class="container">
          <div class="theme">
            <Label for="themeInput" class="form-label">
              Website Theme
            </Label>
            <Input
              class="form-control form-control-lg"
              type="textarea"
              id="themeInput"
              placeholder="Tell us what you would like to do with this website..."
              onChange={handleChange}
              value={theme}
            />
          </div>
          <div class="container" for="element">
            <Label for="element" class="button-label">
              Design Style
            </Label>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="design-style-group"
                    defaultChecked
                  />{" "}
                  Concise
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="design-style-group" /> Technology
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="design-style-group" /> Art
                </Label>
              </FormGroup>
            </Col>
          </div>
          <div class="container" for="element">
            <Label for="element" class="button-label">
              Choose All Elements You Want
            </Label>
            <Col sm={10}>
              {checkboxes.map((checkbox) => (
                <FormGroup check>
                  <Label key={checkbox.id}>
                    <input
                      type="checkbox"
                      checked={checkbox.checked}
                      onChange={() => handleCheckboxChange(checkbox.id)}
                    />
                    {checkbox.label}
                  </Label>
                </FormGroup>
              ))}
              {/* <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Nav Bar
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Footer
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Price Plan
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Features Introduction
                </Label>
              </FormGroup> */}
            </Col>
          </div>
          <div class="container text-center">
            <button
              class="btn btn-light text-center"
              id="generateBtn"
              onClick={handleClickGoButton}
            >
              {loading ? <Spinner animation="border" /> : <>Go</>}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-stars"
                viewBox="0 0 16 16"
              >
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
              </svg>
            </button>
          </div>
        </div>
        <footer class="text-center">
          <p>BlossomLand 2023</p>
        </footer>
      </body>
    </>
  );
};

export default HomePage;
