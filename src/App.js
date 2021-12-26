import { useEffect, useRef, useState } from "react";
import { AppContainer } from "./App.style";
import Sketch from "react-p5";
import { displayFractal, searchFractals } from "./FindWorker";

const App = () => {
  const [functionType, setFunctionType] = useState("pow");
  const [currentGenome, setCurrentGenome] = useState("");
  const [searchGenome, setSearchGenome] = useState("");
  const p5Ref = useRef(null);

  const setup = (p5, parentRef) => {
    p5.createCanvas(window.innerHeight - 120, window.innerHeight - 120).parent(parentRef);
    p5.pixelDensity(1);
    p5.noLoop();
    p5.setAttributes("antialias", true);
    p5.noStroke();
    p5.colorMode(p5.HSB);
  };

  const draw = (p5) => {
    p5Ref.current = p5;
    handleSearch();
  };

  const handleSearch = async () => {
    if (p5Ref.current) {
      p5Ref.current.clear();
      p5Ref.current.loadPixels();
      const searchResp = await searchFractals(p5Ref.current, functionType);
      const pixels = searchResp.pixels;
      setCurrentGenome(searchResp.genome);
      setSearchGenome(searchResp.genome);
      p5Ref.current.pixels = pixels;
      p5Ref.current.updatePixels();
      p5Ref.current.smooth();
    }
  };

  const handleDownloadImg = () => {
    if (p5Ref.current) {
      const link = document.createElement("a");
      link.download = `${currentGenome}.png`;
      link.href = p5Ref.current.canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleDisplay = async () => {
    if (p5Ref.current) {
      p5Ref.current.clear();
      p5Ref.current.loadPixels();
      const displayResp = await displayFractal(p5Ref.current, functionType, searchGenome);
      const pixels = displayResp.pixels;
      setCurrentGenome(displayResp.genome);
      setSearchGenome(displayResp.genome);
      p5Ref.current.pixels = pixels;
      p5Ref.current.updatePixels();
      p5Ref.current.smooth();
    }
  };

  return (
    <AppContainer>
      <div className="canvas-container">
        <Sketch setup={setup} draw={draw} />
        <div className="current-genome">{currentGenome}</div>
      </div>
      <div className="options-container">
        <div className="function-option" onClick={() => setFunctionType("pow")}>
          <input
            className="option-radio"
            type="radio"
            name="function-type"
            value="pow"
            checked={functionType === "pow"}
          />
          <span class="checkmark"></span>
          <div className="option-label">Pow function</div>
        </div>
        <div className="function-option" onClick={() => setFunctionType("cubic")}>
          <input
            className="option-radio"
            type="radio"
            name="function-type"
            value="cubic"
            checked={functionType === "cubic"}
          />
          <span class="checkmark"></span>
          <div className="option-label">Cubic function</div>
        </div>
        {/* <div className="function-option" onClick={() => setFunctionType("tangent")}>
          <input
            className="option-radio"
            type="radio"
            name="function-type"
            value="tangent"
            checked={functionType === "tangent"}
          />
          <span class="checkmark"></span>
          <div className="option-label">Tangent function</div>
        </div> */}
        <div className="function-option" onClick={() => setFunctionType("sine")}>
          <input
            className="option-radio"
            type="radio"
            name="function-type"
            value="sine"
            checked={functionType === "sine"}
          />
          <span class="checkmark"></span>
          <div className="option-label">Sine function</div>
        </div>
        <div className="group-buttons">
          <input value={searchGenome} onChange={(ev) => setSearchGenome(ev.target.value)} />
          <div className="btn" onClick={handleDisplay}>
            Display
          </div>
        </div>
        <div className="group-buttons">
          <div className="btn big-btn" onClick={handleSearch}>
            Search new attractor
          </div>
          <div className="btn" onClick={handleDownloadImg}>
            Download
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default App;
