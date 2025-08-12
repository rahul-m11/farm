import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-forest-green to-bright-green text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-roboto">
              Connect. Trade. Grow.
            </h1>
            <p className="text-xl mb-8 opacity-90">
              The premier marketplace for farmers to sell fresh produce, rent equipment, 
              and get AI-powered farming guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-harvest-orange hover:bg-harvest-orange/90 text-white px-8 py-3 text-lg font-semibold"
              >
                Start Selling
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-forest-green px-8 py-3 text-lg font-semibold bg-transparent"
              >
                Browse Products
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Fresh farm produce display" 
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
