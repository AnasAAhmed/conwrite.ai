import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import SmartLink from "../SmartLink";

const Pricing = () => {
  return (
    <Section crosses className="overflow-hidden" id="pricing">
      
      <div className="container relative z-2 mb-12">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={'/5-small.webp'}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={'/pricing/stars.svg'}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Get started with Brainwave"
          title="Pay once, use forever"
        />

        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10">
          <SmartLink
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="/pricing"
          >
            See the full details
          </SmartLink>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
