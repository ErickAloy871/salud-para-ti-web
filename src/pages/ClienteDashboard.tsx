import { useState } from "react";
import {
  Users,
  ClipboardList,
  Stethoscope,
  BarChart2,
  LogOut,
  Menu,
  X
} from "lucide-react";

const ClienteDashboard = () => {
  const [view, setView] = useState("seguros");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItem = (
    id: string,
    icon: JSX.Element,
    label: string
  ) => (
    <button
      onClick={() => {
        setView(id);
        setSidebarOpen(false);
      }}
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
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Topbar for mobile */}
      <div className="sm:hidden bg-salus-blue text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
            alt="Logo"
            className="h-8"
          />
          <span className="text-lg font-bold">SALUS CLIENTE</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      {(sidebarOpen || window.innerWidth >= 640) && (
        <aside className="bg-salus-blue w-full sm:w-64 p-6 shadow-2xl flex flex-col justify-between text-white rounded-r-3xl transition-all duration-300">
          <div>
            <div className="hidden sm:flex items-center gap-2 mb-6">
              <img
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
                alt="Logo"
                className="h-10"
              />
              <h1 className="text-xl font-bold tracking-tight">SALUS CLIENTE</h1>
            </div>

            <nav className="flex flex-col gap-3 w-full">
              {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Mis seguros")}
              {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Solicitar reembolso")}
              {navItem("pagos", <BarChart2 className="w-5 h-5" />, "Pagos y vencimientos")}
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
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-salus-gray">Panel del Cliente</h2>
          <div className="text-sm text-salus-gray-light">Bienvenido, estimado cliente</div>
        </header>

        <section className="p-4 sm:p-6">
          {view === "seguros" && (
            <p className="text-salus-gray">Aquí puedes ver tus seguros contratados.</p>
          )}
          {view === "reembolsos" && (
            <p className="text-salus-gray">Aquí puedes solicitar reembolsos.</p>
          )}
          {view === "pagos" && (
            <p className="text-salus-gray">Aquí puedes ver el estado de tus pagos.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClienteDashboard;
