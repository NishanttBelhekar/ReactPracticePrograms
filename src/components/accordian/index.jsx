import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null); // For single selection
  const [multiple, setMultiple] = useState([]); // For multiple selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Mode toggle

  // Single selection handler
  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Multiple selection handler
  function handleMultiSelection(getCurrentId) {
    const isSelected = multiple.includes(getCurrentId);
    if (isSelected) {
      // Remove from multiple selections
      setMultiple(multiple.filter((id) => id !== getCurrentId));
    } else {
      // Add to multiple selections
      setMultiple([...multiple, getCurrentId]);
    }
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="toggle-button"
      >
        {enableMultiSelection
          ? "Disable Multi Selection"
          : "Enable Multi Selection"}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {enableMultiSelection
                    ? multiple.includes(dataItem.id)
                      ? "-"
                      : "+"
                    : selected === dataItem.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {enableMultiSelection
                ? multiple.includes(dataItem.id) && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data Found</div>
        )}
      </div>
    </div>
  );
}
