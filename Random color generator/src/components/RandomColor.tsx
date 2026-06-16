import { useState, useEffect } from "react";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function handleCreateRandomHEXColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        // To generate each letter one by one
      hexColor += hex[Math.floor(Math.random() * hex.length)];
    }
    // console.log(hexColor)
    setColor(hexColor);
  }

  function handleCreateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    let rgbColor = `rgb(${r}, ${g}, ${b})`;
    setColor(rgbColor)
  }
    useEffect(() => {
    if(typeOfColor === "rgb"){
        handleCreateRandomRGBColor();
    } 
    else{
        handleCreateRandomHEXColor();
    }
  }, [typeOfColor]);

  return (
    <div style={{ height: "100vh", width: "100vw", background: color }}>
      <button onClick={() => setTypeOfColor("hex")}>Generate HEX color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Generate RGB color</button>
      <button onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHEXColor
            : handleCreateRandomRGBColor
        }>
        Generate Random Color
      </button>
      <h3>{typeOfColor === "hex" ? "HEX" : "RGB" + " Color"} </h3>
      <h1>{color}</h1>
    </div>
  );
};

export default RandomColor;
