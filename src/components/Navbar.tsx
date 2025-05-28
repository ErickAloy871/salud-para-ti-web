
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
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
            alt="SALUS ASEGURADORA" 
            className="h-12 w-auto"
          />
          <div className="hidden sm:block">
            <span className="text-2xl font-bold text-salus-gray">SALUS</span>
            <div className="text-sm text-salus-gray-light font-medium">ASEGURADORA</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-salus-gray hover:text-salus-blue font-medium transition-colors">
            Inicio
          </Link>
          <Link to="/planes" className="text-salus-gray hover:text-salus-blue font-medium transition-colors">
            Planes
          </Link>
          <Link to="/coberturas" className="text-salus-gray hover:text-salus-blue font-medium transition-colors">
            Coberturas
          </Link>
          <Link to="/nosotros" className="text-salus-gray hover:text-salus-blue font-medium transition-colors">
            Nosotros
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button className="bg-salus-blue hover:bg-salus-blue-dark text-white">
              Iniciar Sesión
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-salus-gray"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 animate-fade-in border-t">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-salus-gray hover:text-salus-blue font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/planes"
              className="text-salus-gray hover:text-salus-blue font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Planes
            </Link>
            <Link
              to="/coberturas"
              className="text-salus-gray hover:text-salus-blue font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Coberturas
            </Link>
            <Link
              to="/nosotros"
              className="text-salus-gray hover:text-salus-blue font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login">
                <Button className="bg-salus-blue hover:bg-salus-blue-dark text-white w-full">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
