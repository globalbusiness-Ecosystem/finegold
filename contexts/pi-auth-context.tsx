"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

declare global { interface Window { Pi: any; } }

interface PiUser { uid: string; username: string; }
interface Product { id: string; name: string; price_in_pi: number; }
interface AuthCtx {
  user: PiUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasError: boolean;
  authMessage: string;
  products: Product[];
  signIn: () => Promise<void>;
  reinitialize: () => void;
}

const TESTNET_PRODUCTS: Product[] = [
  { id: "69a8aa805bc526c57d3519dd", name: "Gold Purchase", price_in_pi: 1 },
];

const PiAuthContext = createContext<AuthCtx>({
  user: null, loading: true, isAuthenticated: false,
  hasError: false, authMessage: "Connecting to Pi Network...",
  products: TESTNET_PRODUCTS,
  signIn: async () => {}, reinitialize: () => {},
});

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [authMessage, setAuthMessage] = useState("Connecting to Pi Network...");

  const authenticate = useCallback(async () => {
    setHasError(false);
    setLoading(true);
    setAuthMessage("Connecting to Pi Network...");

    if (typeof window === "undefined" || !window.Pi) {
      setHasError(true);
      setAuthMessage("Authentication error: Request failed");
      setLoading(false);
      return;
    }

    try {
      window.Pi.init({ version: "2.0", sandbox: true });
      setAuthMessage("Authenticating with Pi...");

      const authResult = await window.Pi.authenticate(
        ["username", "payments"],
        () => {}
      );

      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authResult }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setAuthMessage("Authenticated!");
      } else {
        throw new Error(data.error || "Auth failed");
      }
    } catch (e: any) {
      setHasError(true);
      setAuthMessage("Authentication error: Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { authenticate(); }, [authenticate]);

  return (
    <PiAuthContext.Provider value={{
      user, loading, isAuthenticated: !!user,
      hasError, authMessage,
      products: TESTNET_PRODUCTS,
      signIn: authenticate,
      reinitialize: authenticate,
    }}>
      {children}
    </PiAuthContext.Provider>
  );
}

export const usePiAuth = () => useContext(PiAuthContext);
