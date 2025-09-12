import Image from "next/image";
import Benefits from "../components/design-components/Benefits";
import Collaboration from "../components/design-components/Collaboration";
import Footer from "../components/design-components/Footer";
import Header from "../components/design-components/Header";
import Hero from "../components/design-components/Hero";
import Pricing from "../components/design-components/Pricing";
import Roadmap from "../components/design-components/Roadmap";
import Services from "../components/design-components/Services";
import ButtonGradient from "@/assets/svg/ButtonGradient";
import Section from "@/components/design-components/Section";

export const dynamic = 'force-static';

const howToSteps = [
  {
    id: 1,
    title: "Step 1: Choose an AI Agent",
    description: "Select a specialized agent like Blog Writer, Code Debugger, or Freelance Guide — tailored to your workflow.",
    image: "/demo.png", // Replace with your actual image paths
  },
  {
    id: 2,
    title: "Step 2: Describe Your Task",
    description: "Use natural language to tell Brainwave what you need — write, debug, generate ideas, and more.",
    image: "/demo2.png",
  },
  {
    id: 3,
    title: "Step 3: Review your Chat history",
    description: "You can track your AI-Created content from here at /history as well as Billing history.",
    image: "/demo2.png",
  },
  {
    id: 4,
    title: "Our new Chatbot",
    description: "Get results instantly.All within a clean, distraction-free interface.",
    image: "/demo3.png",
  },
];
export default async function Home() {
  return (
    <>
      <div className="overflow-hidden sm:px-8">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Section
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings="py-16"
          id="how-to-use"
        >
          <div className="container space-y-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary">
              How to Use Conwrite.ai
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple, AI-powered workflow.
            </p>

            <div className="sm:grid flex flex-wrap sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
              {howToSteps.map((step, index) => {
                let classNames = "rounded-2xl overflow-hidden shadow-sm border-2 border-primary/20 p-1 sm:p-3 flex flex-col bg-muted/10";
                let aspect = "";

                if (index === 0) {
                  classNames += " col-span-3 row-span-2";
                  aspect='16/9'
                } else if (index === 1) {
                  classNames += "col-span-2 sm:col-span-1 row-span-2";
                  aspect='4/5'
                } else if (index === 2) {
                  classNames += " col-span-1 row-span-2";
                  aspect='4/5'
                } else if (index === 3) {
                  classNames += " col-span-3 row-span-2";
                  aspect='16/9'
                }
                return (
                  <div key={step.id} className={classNames}>
                    <div style={{aspectRatio:aspect}} className="relative w-full mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover border-2 border-primary/20 rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </Section>

        <Pricing />
        <Roadmap />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
}
