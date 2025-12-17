import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const [activity, setActivity] = useState<string[]>([]);
  const [usage, setUsage] = useState(0);

  const addActivity = (text: string) => {
    setActivity((prev) => [text, ...prev]);
    setUsage((u) => u + text.length);
  };

  return (
    <AppContext.Provider value={{ activity, usage, addActivity }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
