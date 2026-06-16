import { useState } from "react";
import { data } from "./data.js";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(id) {
    setSelected(id);
    if (selected == id) {
      setSelected(null);
    }
  }

  function handleMultipleSelection(id) {
    let duplicate = [...multiple];
    const findIndexOfCurrentId = duplicate.indexOf(id);
    if (findIndexOfCurrentId === -1) {
      duplicate.push(id);
    } else {
      duplicate.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(duplicate);
  }

  return (
    <div
      className="wrapper"
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <button onClick={() => setEnableMulti(!enableMulti)}>
        Enable multi selection
      </button>
      <div
        className="accordian"
        style={{
          width: "500px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data && data.length ? (
          data.map((dataItem) => (
            <div
              className="item"
              style={{
                background: "#a305fb",
                marginBottom: "10px",
                padding: "10px 20px",
              }}
            >
              <div
                onClick={
                  enableMulti
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <h3>{dataItem.question}</h3>
                {/* {selected} */}
                <span>+</span>
              </div>

              {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div
                  className="content"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {dataItem.answer}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </div>
  );
};

export default Accordian;
