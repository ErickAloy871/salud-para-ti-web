
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-insurance-blue pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10 animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Protección para tu salud</span>
            <br />y la de tu familia
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
            Ofrecemos los mejores planes de seguro médico con cobertura completa y atención personalizada. Tu bienestar es nuestra prioridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-insurance-purple hover:bg-purple-600 text-white text-lg px-8 py-6">
              Ver Planes
            </Button>
            <Button variant="outline" className="border-insurance-purple text-insurance-purple hover:text-white hover:bg-insurance-purple text-lg px-8 py-6">
              Contactar Asesor <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Familia sonriente con seguro de salud"
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
    </div>
  );
};

export default Hero;
