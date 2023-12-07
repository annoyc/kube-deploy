import { useState, type FC, useEffect } from "react";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
  message: string;
  duration?: number;
  setToastMsg: (toastMsg: string) => void;
}

const Toast: FC<Props> = ({
  className,
  message,
  duration = 3000,
  setToastMsg,
}) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (message) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
        setToastMsg("");
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, duration]);
  return (
    <>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className={cn("alert alert-success", className)}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
