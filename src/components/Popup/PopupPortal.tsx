import ReactDOM from "react-dom";

export const PopupPortal = ({ children }) => {
  const el = document.getElementById("popup_root");
  return ReactDOM.createPortal(children, el);
};
