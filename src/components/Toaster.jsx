import { ToastContainer } from "react-toastify";

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeButton={false}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="dark"
    />
  );
}
