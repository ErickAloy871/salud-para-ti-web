
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Planes from "./pages/Planes";
import Coberturas from "./pages/Coberturas";
import Nosotros from "./pages/Nosotros";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// ✅ Nueva vista del administrador
import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import AgenteDashboard from "./pages/AgenteDashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/coberturas" element={<Coberturas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />

          {/* NUEVA RUTA PARA EL PANEL DE ADMIN */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* NUEVA RUTA PARA EL PANEL DE CLIENTE*/}
          <Route path="/cliente" element={<ClienteDashboard />} />
          {/* NUEVA RUTA PARA EL PANEL DE AGENTE*/}
          <Route path="/asesor" element={<AgenteDashboard />} />

          {/* Ruta por defecto si no se encuentra */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
