"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Title = () => {
  const [title, setTitle] = useState<string | null>("");
  const searchParams = useSearchParams();
  useEffect(() => {
    setTitle(searchParams.get("text"));
  }, [searchParams]);

  return <div className=" text-3xl font-bold">{title}</div>;
};

export default Title;
