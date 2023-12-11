import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePath(URL.createObjectURL(file));
    }
  };

  const handleAddFileClick = () => {
    fileInputRef.current.click();
  };

  const handleClick = async () => {
    if (imagePath) {
      try {
        const result = await Tesseract.recognize(imagePath, "eng", {
          logger: (m) => m,
        });
        setText(result.data.text);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="container">
          <div className="left">
            <h2>Upload image</h2>
            {imagePath && (
              <img src={imagePath} className="App-image" alt="Uploaded" />
            )}
            <input type="file" onChange={handleChange} ref={fileInputRef} />
            <button onClick={handleAddFileClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                  stroke="#fffffff"
                  stroke-width="2"
                ></path>
                <path
                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
                  stroke="#fffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              Add file
            </button>
            <button class="button-two" onClick={handleClick}>
              <svg
                class="svgIcon"
                viewBox="0 0 512 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
              </svg>
              Convert to text
            </button>
          </div>
          <div className="right">
            <h2>Extracted text</h2>
            <p>{text}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
