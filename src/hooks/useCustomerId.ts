import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useCustomerId() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const {
    query: { cid },
    isReady,
  } = useRouter();

  useEffect(() => {
    const storedId = sessionStorage.getItem(CUSTOMER_ID_KEY);
    if (storedId) {
      setCustomerId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!isReady || !cid) return;

    const customerId = String(cid);
    sessionStorage.setItem(CUSTOMER_ID_KEY, customerId);
    setCustomerId(customerId);
  }, [cid, isReady]);

  return { customerId };
}

const CUSTOMER_ID_KEY = "customerId";
