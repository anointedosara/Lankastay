"use client";

import { useEffect, useState } from "react";
import { getCurrentAccount, type Account } from "@/lib/store";

export function useSession() {
  const [account, setAccount] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAccount(getCurrentAccount());
    setReady(true);
  }, []);

  return {
    account,
    ready,
    refresh: () => setAccount(getCurrentAccount()),
  };
}
