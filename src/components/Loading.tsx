import { type FC } from "react";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

const Loading: FC<Props> = ({ className }) => {
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
