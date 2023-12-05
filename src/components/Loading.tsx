import { type FunctionComponent } from "react";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

const Loading: FunctionComponent<Props> = ({ className }) => {
  return (
    <span
      className={cn(
        "loading loading-dots loading-lg h-full text-black",
        className,
      )}
    ></span>
  );
};

export default Loading;
