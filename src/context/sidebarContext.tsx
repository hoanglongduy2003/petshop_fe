import { createContext, useReducer, ReactNode } from "react";
import reducer from "../reducer/sidebarReducer";

type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const initialState = {
  isSidebarOpen: false,
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };
  return (
    <SidebarContext.Provider value={{ ...state, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
