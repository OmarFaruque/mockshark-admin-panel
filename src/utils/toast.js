import { toast } from "react-toastify";

const preDefinedToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showSuccessToast = (message, toastOptions) => {
  toast.success(message, toastOptions ?? preDefinedToastOptions);
};

export const showErrorToast = (message, toastOptions) => {
  toast.error(message, toastOptions ?? preDefinedToastOptions);
};
