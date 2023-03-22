import { toast } from "react-toastify";

const notify = (type, value, callback = undefined) => {
  toast[type](value);
  if (type === "success") {
    toast.onChange((payload) => {
      if (payload.status === "removed" && callback !== undefined) {
        callback();
      }
    });
  }
};
export default notify;
