
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Plans from "@/components/Plans";
import CallToAction from "@/components/CallToAction";

const PlanesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-insurance-blue">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Planes</h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
              Encuentra el plan de salud ideal para ti y tu familia con la mejor cobertura médica
            </p>
          </div>
        </div>
        <Plans />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default PlanesPage;
