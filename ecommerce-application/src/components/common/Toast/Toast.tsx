import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast(): React.ReactElement {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
    />
  );
}
