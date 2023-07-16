import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal_root");
  return ReactDOM.createPortal(children, el);
};
export default ModalPortal;
