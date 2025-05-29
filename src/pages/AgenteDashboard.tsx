import { useState } from "react";
import { Users, ClipboardList, Stethoscope, BarChart2, LogOut, Menu } from "lucide-react";

const AgenteDashboard = () => {
  const [view, setView] = useState("clientes");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (id: string, icon: JSX.Element, label: string) => (
    <button
      onClick={() => {
        setView(id);
        setMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:bg-white hover:text-salus-blue ${
        view === id
          ? "bg-white text-salus-blue font-semibold shadow-md"
          : "bg-salus-blue/80 text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Boton hamburguesa */}
      <div className="sm:hidden flex justify-between items-center bg-salus-blue p-4 text-white">
        <h1 className="font-bold">SALUS ASESOR</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      {(menuOpen || window.innerWidth >= 640) && (
        <aside className="bg-salus-blue w-full sm:w-64 p-6 shadow-lg flex flex-col text-white">
          <div className="flex items-center mb-8 space-x-3">
            <img src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" alt="Logo" className="h-10" />
            <h1 className="text-xl font-bold">SALUS ASESOR</h1>
          </div>
          <nav className="space-y-3">
            {navItem("clientes", <Users className="w-5 h-5" />, "Gestion de clientes")}
            {navItem("seguros", <ClipboardList className="w-5 h-5" />, "Contratación de seguros")}
            {navItem("reembolsos", <Stethoscope className="w-5 h-5" />, "Reembolsos")}
            {navItem("reportes", <BarChart2 className="w-5 h-5" />, "Reportes")}
          </nav>
          <div className="mt-auto pt-6">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-salus-gray hover:bg-red-500 hover:text-white font-medium transition">
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </aside>
      )}

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-salus-gray">Panel del Asesor</h2>
          <div className="text-sm text-salus-gray-light">Bienvenido</div>
        </header>
        <section className="p-6">
          {view === "clientes" && <p className="text-salus-gray">Aquí va la gestión de clientes.</p>}
          {view === "seguros" && <p className="text-salus-gray">Aquí va la contratación de seguros.</p>}
          {view === "reembolsos" && <p className="text-salus-gray">Aquí va la revisión de reembolsos.</p>}
          {view === "reportes" && <p className="text-salus-gray">Aquí van los reportes disponibles.</p>}
        </section>
      </main>
    </div>
  );
};

export default AgenteDashboard;
