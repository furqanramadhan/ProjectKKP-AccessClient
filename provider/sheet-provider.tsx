"use client";

import { useDebounce, useMountedState } from "react-use";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useState, useEffect } from "react";

export const SheetProvider = () => {
  //   const isMounted = useMountedState();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  );
};
