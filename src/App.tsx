import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transcription from "./pages/Transcription";
import Usage from "./pages/Usage";
import Quality from "./pages/Quality";
import Activity from "./pages/Activity";
import Tips from "./pages/Tips";
import { AppProvider } from "./context/AppContext";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="layout">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transcription" element={<Transcription />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
