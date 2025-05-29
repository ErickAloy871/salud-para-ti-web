import { useState } from "react";
import {
  Users,
  ClipboardList,
  Stethoscope,
  BarChart2,
  LogOut,
  FileText,
  CreditCard,
} from "lucide-react";

const AgenteDashboard = () => {
  const [view, setView] = useState("clientes");

  const navItem = (
    id: string,
    icon: JSX.Element,
    label: string
  ) => (
    <button
      onClick={() => setView(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-xl hover:bg-white hover:text-salus-blue ${
        view === id
          ? "bg-white text-salus-blue font-semibold shadow-xl"
          : "bg-salus-blue/80 text-white"
      }`}
    >
      {icon}
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-salus-blue text-white w-full md:w-64 p-4 md:p-6 shadow-2xl rounded-r-3xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
              alt="Logo"
              className="h-10"
            />
            <h1 className="text-xl font-bold tracking-tight">SALUS ASESOR</h1>
          </div>

          <nav className="flex flex-col gap-3 w-full">
            {navItem("clientes", <Users className="w-5 h-5" />, "Gestionar clientes")}
            {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Contratar seguros")}
            {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Reembolsos")}
            {navItem("reportes", <BarChart2 className="w-5 h-5" />, "Reportes")}
          </nav>
        </div>

        <div className="mt-6 w-full flex justify-center">
          <button
            className="w-full max-w-[200px] flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-salus-gray hover:bg-red-500 hover:text-white font-medium transition shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-lg md:text-xl font-semibold text-salus-gray">Panel del Asesor</h2>
          <div className="text-sm text-salus-gray-light">Bienvenido, Agente de Seguros</div>
        </header>

        <section className="p-4 md:p-6">
          {view === "clientes" && (
            <p className="text-salus-gray">Aquí va la gestión de clientes.</p>
          )}
          {view === "seguros" && (
            <p className="text-salus-gray">Aquí va la contratación de seguros.</p>
          )}
          {view === "reembolsos" && (
            <p className="text-salus-gray">Aquí va la revisión de reembolsos.</p>
          )}
          {view === "reportes" && (
            <p className="text-salus-gray">Aquí van los reportes disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AgenteDashboard;
