"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (val: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(initial);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (item !== null) setStored(JSON.parse(item) as T);
    } catch {
      // ignore parse/access errors
    }
  }, [key]);

  function setValue(val: T | ((prev: T) => T)) {
    setStored((prev) => {
      const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  return [stored, setValue];
}
