import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";

// ✅ Tipo personalizado para la respuesta del backend
type LoginResponse = {
  mensaje: string;
  usuario: {
    tipo: string;
    // Puedes agregar otros campos si los necesitas
  };
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>("http://localhost:8000/login", {
        correo: formData.correo,
        password: formData.password,
      });

      const { mensaje, usuario } = response.data;

      // Guarda el usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      alert(mensaje);

      if (usuario.tipo === "admin" || usuario.tipo === "administrador") {
        navigate("/admin");
      } else if (usuario.tipo === "cliente") {
        navigate("/cliente");
      } else if (usuario.tipo === "asesor") {
        navigate("/asesor");
      } else {
        alert(`Tipo de usuario no reconocido: ${usuario.tipo}`);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo y encabezado */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS ASEGURADORA" 
                className="h-16 w-auto"
              />
              <Shield className="h-8 w-8 text-salus-blue" />
            </div>
            <h1 className="text-2xl font-bold text-salus-gray mb-2">SALUS ASEGURADORA</h1>
            <p className="text-salus-gray-light">Inicia sesión en tu cuenta</p>
          </div>

          {/* Formulario de login */}
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="correo" className="text-salus-gray">Correo electrónico</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-salus-blue focus:border-salus-blue"
                placeholder="Correo electrónico"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-salus-gray">Contraseña</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10 focus:ring-salus-blue focus:border-salus-blue"
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-salus-blue focus:ring-salus-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-salus-gray">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-salus-blue hover:text-salus-blue-dark">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-salus-blue hover:bg-salus-blue-dark text-white py-3 rounded-lg font-semibold"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-salus-gray-light">
              ¿No tienes una cuenta?{" "}
              <a href="#" className="font-medium text-salus-blue hover:text-salus-blue-dark">
                Regístrate aquí
              </a>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-salus-gray-light hover:text-salus-blue">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
