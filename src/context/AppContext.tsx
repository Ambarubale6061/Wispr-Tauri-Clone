import { createContext, useState, useContext, ReactNode } from "react";

type AppContextType = {
  activity: string[];
  usage: number;
  addActivity: (text: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [activity, setActivity] = useState<string[]>([]);
  const [usage, setUsage] = useState(0);

  const addActivity = (text: string) => {
    setActivity((prev) => [text, ...prev]);
    setUsage((prev) => prev + text.length);
  };

  return (
    <AppContext.Provider value={{ activity, usage, addActivity }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
