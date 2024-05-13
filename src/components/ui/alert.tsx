import cn from "classnames";
import { CloseIcon } from "@/components/ui/close-icon";

type AlertProps = {
  message: string | null;
  closeable?: boolean;
  onClose?: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
};

const Alert: React.FC<AlertProps> = ({
  message,
  closeable = false,
  className,
  onClose,
}) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded py-4 px-5 shadow-sm bg-red-600",
        className
      )}
      role="alert"
    >
      <p className="text-sm text-white">{message}</p>
      {closeable && (
        <button
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
          title="Close alert"
          className="absolute top-1/2 right-0 -mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-gray-300 hover:bg-opacity-25 focus:bg-gray-300 focus:bg-opacity-25 focus:outline-0 "
        >
          <span aria-hidden="true">
            <CloseIcon className="h-3 w-3" />
          </span>
        </button>
      )}
    </div>
  );
};

export default Alert;
