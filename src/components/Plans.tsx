
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Plans = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "$99",
      period: "mensual",
      description: "Cobertura esencial para individuos",
      features: [
        "Consultas médicas generales",
        "Emergencias médicas básicas",
        "Medicamentos genéricos",
        "Laboratorio básico",
        "Atención telefónica 24/7",
      ],
      highlighted: false,
    },
    {
      name: "Plan Familiar",
      price: "$199",
      period: "mensual",
      description: "Cobertura completa para toda la familia",
      features: [
        "Consultas médicas generales y especialistas",
        "Emergencias médicas completas",
        "Medicamentos de marca y genéricos",
        "Laboratorio y diagnóstico avanzado",
        "Atención hospitalaria preferente",
        "Cobertura dental básica",
        "Hasta 4 miembros incluidos",
      ],
      highlighted: true,
    },
    {
      name: "Plan Premium",
      price: "$299",
      period: "mensual",
      description: "Máxima cobertura y beneficios exclusivos",
      features: [
        "Consultas ilimitadas con especialistas",
        "Cobertura hospitalaria completa",
        "Medicamentos sin restricciones",
        "Estudios diagnósticos avanzados",
        "Habitación individual en hospitalización",
        "Cobertura dental y oftalmológica",
        "Tratamientos especializados",
        "Asistencia internacional",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Planes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tenemos el plan perfecto para ti y tu familia con la mejor cobertura del mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.highlighted
                  ? "border-2 border-insurance-purple relative bg-white transform scale-105 md:scale-110"
                  : "bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-insurance-purple text-white py-2 px-4 text-sm font-semibold absolute top-0 right-0 rounded-bl-lg">
                  Más Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-insurance-orange hover:bg-orange-600"
                      : "bg-insurance-purple hover:bg-purple-700"
                  } text-white py-6`}
                >
                  Contratar Ahora
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
