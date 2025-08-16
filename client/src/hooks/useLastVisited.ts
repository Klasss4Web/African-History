import { useEffect } from "react";

export function useLastVisited(path: string, label: string) {
  useEffect(() => {
    localStorage.setItem(
      "lastVisited",
      JSON.stringify({ path, label, date: Date.now() })
    );
  }, [path, label]);
}
