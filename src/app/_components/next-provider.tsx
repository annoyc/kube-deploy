"use client";
import { NextUIProvider } from "@nextui-org/react";
import type { FunctionComponent, ReactNode } from "react";

interface NextUIWrapperProps {
  children: ReactNode;
}

const NextUIWrapper: FunctionComponent<NextUIWrapperProps> = ({ children }) => {
  return (
    <NextUIProvider className="box-border h-auto w-full">
      {children}
    </NextUIProvider>
  );
};

export default NextUIWrapper;
