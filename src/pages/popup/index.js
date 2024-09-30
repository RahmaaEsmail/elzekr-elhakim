import React, { useEffect } from "react";
// import { exitModal } from "../../assets/svgIcons";
import "./style.css";
import { IoMdClose } from "react-icons/io";
const PopUp = ({ title, open, setOpen, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [open]);
  if (!open) return null;

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className={`modalOverlay ${open ? "open" : ""}`}
        onClick={closeModal}
      ></div>
      <div className={`modalContainer ${open ? "open" : ""}`}>
        <div className="modalHeader">
          <span className="modalTitle">{title}</span>
          <span className="exitModal" onClick={closeModal}>
            <IoMdClose />
          </span>
        </div>
        <div className="modalChildren">{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
