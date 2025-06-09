import React, { createContext, useState, useEffect } from "react";

type Cliente = {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  tipoSeguro: string;
  planSeguro: string;
  coberturaAdicional: string;
  observaciones: string;
  estado: string;
  valorMensual: number;
};

type ClientesContextType = {
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

export const ClientesContext = createContext<ClientesContextType>({
  clientes: [],
  setClientes: () => {},
});

export const ClientesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const storedClientes = localStorage.getItem("clientes");
    return storedClientes ? JSON.parse(storedClientes) : [];
  });

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  return (
    <ClientesContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClientesContext.Provider>
  );
};