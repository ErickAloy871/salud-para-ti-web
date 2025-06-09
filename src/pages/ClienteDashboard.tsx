import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClienteDashboard = () => {
  const [cliente, setCliente] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Leer cliente logueado desde localStorage
    const storedCliente = localStorage.getItem("clienteLogueado");
    if (storedCliente) {
      setCliente(JSON.parse(storedCliente));
    } else {
      // Redirigir al login si no hay cliente logueado
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clienteLogueado");
    navigate("/login");
  };

  if (!cliente) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Bienvenido, {cliente.nombre}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Correo:</strong> {cliente.email}</p>
            <p><strong>Cédula:</strong> {cliente.cedula}</p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Seguro Contratado</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Tipo de Seguro:</strong> {cliente.seguro}</p>
            <p><strong>Valor Mensual:</strong> ${cliente.valorMensual}/mes</p>
          </CardContent>
        </Card>
        <Button onClick={handleLogout} className="mt-6 bg-red-600 text-white py-2 rounded-lg">
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default ClienteDashboard;
