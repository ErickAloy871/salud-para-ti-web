
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Plans = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "$149",
      period: "mensual",
      description: "Cobertura esencial para cuidado personal",
      features: [
        "Consultas médicas generales",
        "Emergencias médicas básicas",
        "Medicamentos genéricos",
        "Laboratorios básicos",
        "Atención telefónica 24/7",
        "Red nacional de clínicas",
      ],
      highlighted: false,
      popular: false,
    },
    {
      name: "Plan Familiar",
      price: "$299",
      period: "mensual",
      description: "Protección completa para toda la familia",
      features: [
        "Consultas ilimitadas generales y especialistas",
        "Emergencias y hospitalización completa",
        "Medicamentos de marca y genéricos",
        "Laboratorios y diagnósticos avanzados",
        "Cobertura dental y oftalmológica",
        "Hasta 5 miembros incluidos",
        "Telemedicina 24/7",
        "Segunda opinión médica",
      ],
      highlighted: true,
      popular: true,
    },
    {
      name: "Plan Premium",
      price: "$459",
      period: "mensual",
      description: "Máxima cobertura y beneficios exclusivos",
      features: [
        "Cobertura internacional",
        "Habitación individual garantizada",
        "Cirugías y tratamientos especializados",
        "Medicina alternativa y bienestar",
        "Chequeos preventivos anuales",
        "Asistencia en viaje",
        "Concierge médico personal",
        "Cobertura sin límites",
      ],
      highlighted: false,
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
              alt="SALUS" 
              className="h-8 w-auto"
            />
            <span className="text-salus-blue font-semibold">PLANES DE PROTECCIÓN</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-salus-gray">
            Encuentra tu plan ideal
          </h2>
          <p className="text-salus-gray-light max-w-2xl mx-auto text-lg">
            Planes diseñados para cada necesidad con la mejor cobertura médica del mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-2 border-salus-blue relative bg-white scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-salus-blue text-white py-2 px-4 text-sm font-semibold absolute top-0 right-0 rounded-bl-lg flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span>Más Popular</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-salus-gray">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-salus-blue">{plan.price}</span>
                  <span className="text-salus-gray-light">/{plan.period}</span>
                </div>
                <p className="text-salus-gray-light mb-6">{plan.description}</p>
                
                <Button
                  className={`w-full mb-8 py-6 rounded-lg font-semibold ${
                    plan.highlighted
                      ? "bg-salus-blue hover:bg-salus-blue-dark text-white"
                      : "bg-salus-gray hover:bg-salus-gray/90 text-white"
                  }`}
                >
                  Contratar Plan
                </Button>
                
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-salus-gray mb-3">
                    Incluye:
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-salus-gray-light text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-salus-gray-light mb-4">
            ¿Necesitas un plan personalizado?
          </p>
          <Button variant="outline" className="border-salus-blue text-salus-blue hover:bg-salus-blue hover:text-white">
            Hablar con un Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Plans;
