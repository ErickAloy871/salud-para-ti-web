
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-insurance-purple">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Protege a los que más quieres hoy mismo
          </h2>
          <p className="text-white/90 text-lg mb-8">
            No esperes a que sea demasiado tarde. Asegura tu salud y la de tu familia con los mejores planes del mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-insurance-purple hover:bg-gray-100 text-lg px-8 py-6">
              Cotizar Ahora
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Hablar con un Asesor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
