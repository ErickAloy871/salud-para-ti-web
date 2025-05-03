
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-insurance-purple">Salud Para Ti</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-insurance-purple font-medium">
            Inicio
          </Link>
          <Link to="/planes" className="text-gray-800 hover:text-insurance-purple font-medium">
            Planes
          </Link>
          <Link to="/coberturas" className="text-gray-800 hover:text-insurance-purple font-medium">
            Coberturas
          </Link>
          <Link to="/nosotros" className="text-gray-800 hover:text-insurance-purple font-medium">
            Nosotros
          </Link>
          <Link to="/contacto" className="text-gray-800 hover:text-insurance-purple font-medium">
            Contacto
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-insurance-purple text-insurance-purple hover:bg-insurance-purple hover:text-white">
            Iniciar Sesión
          </Button>
          <Button className="bg-insurance-orange hover:bg-orange-600 text-white">
            Cotizar Ahora
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-insurance-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/planes"
              className="text-gray-800 hover:text-insurance-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Planes
            </Link>
            <Link
              to="/coberturas"
              className="text-gray-800 hover:text-insurance-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Coberturas
            </Link>
            <Link
              to="/nosotros"
              className="text-gray-800 hover:text-insurance-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/contacto"
              className="text-gray-800 hover:text-insurance-purple font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-insurance-purple text-insurance-purple hover:bg-insurance-purple hover:text-white">
                Iniciar Sesión
              </Button>
              <Button className="bg-insurance-orange hover:bg-orange-600 text-white">
                Cotizar Ahora
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
