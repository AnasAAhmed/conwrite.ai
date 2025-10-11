import DesignButton from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Parallax } from "./design/Hero";
import CompanyLogos from "./CompanyLogos";
import { GradientRight, Gradient as GradientLeft } from "./design/Roadmap";
import { SplitText2 } from "../ui/split-text-ssr";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight, MoveRight } from "lucide-react";
import SmartLink from "../SmartLink";

const Hero = () => {

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings='s'
      id="hero"
    >
      <div className="container flex flex-col justify-center bsg-[#ffffff] items-center mst-7 sm:mt-12 relative ">
        <GradientRight />
        <GradientLeft />
        <SmartLink
          href={'/chat'}
          title="Try the New AI Chat Bot with Web Search For Free."
          className="bg-indigo-300/20 mb-3 px-1 sm:px-3 text-centers text-[10px] sm:text-[16px] lg:text-[18px] text-indigo-600 border-indigo-700 border rounded-full">
          ● Try the New AI Chat Bot with Web Search For Free.
        </SmartLink>
        <div className="relative z-1 mx-auto text-center mb-[2rem]">
          <SplitText2
            text="Explore the Possibilities of Content Generation with Conwrite.ai"
            mode="words"
            className="relative z-10 mx-audto max-w-full text-center text-[27px] font-bold md:text-4xl lg:text-6xl "
            delayPerItem={0.05}
            duration={0.3}
            y={12}
            highlightWords={[
              { word: 'Content', color: "#3B82F6" },
              { word: 'Generation', color: "#8B5CF6  " },
            ]}
          />
          {/* <h1 className="h1-fade text-2xl font-semibold text-secondary-foreground md:text-4xl lg:text-6xl mb-6">
            <span className="bg-clip-text bg-gradient-to-tl from-blue-400 to-violet-600  text-transparent">&nbsp;Content Generation</span> with {` `}
            <span className="inline-block relative">
              Conwrite.ai{" "}
              <img
                src={'/hero/curve.png'}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1> */}
          <p style={{ fontWeight: '50' }} className="p-fade mt-6 max-w-3xl text-muted-foreground mx-auto text-sm md:text-xl lg:text-2xl  ">
            Revolutionize your content creation with our AI-Agents, delivering engaging and high-quality text in seconds.
          </p>
          <div className="flex justify-center items-center gap-3 btns-fade mt-6 ">

            {/* <Button px="sm:px-7 px-3" href="/chat">
              AI Chatbot
            </Button> */}
            <DesignButton href="#how-to-use">
              How To Use
            </DesignButton>
            <SmartLink href={'/dashboard'} title='Dashboard'>
              <Button className="bg-primary gap-2 group text-primary-foreground rounded-lg" variant={'outline'}>
                Get started <MoveRight size={'1.3rem'} className="group-hover:translate-x-2 duration-300" />
              </Button>
            </SmartLink>
          </div>
        </div>
        <div className="relative w-full mx-auto md:max-w-6xl">
          <div className="hero-img-fadeUp w-full relative z-1 p-0.5 rounded-2xl bg-[conic-gradient(from_225deg,#FFC876,#79FFF7,#9F53FF,#FF98E2,#FFC876)]">
            <div className=" bg-[#19142b] rounded-[1rem]">
              <div className="relative w-full aspect-[4/4] sm:aspect-[16/9] rounded-[0.9rem] overflow-hidden">
                {/* <Image
                  src="/hero/hero.webp"
                  alt="Hero image dark"
                  fill
                  sizes="100vw"
                  className={`absolute dark:block hidden transition-opacity`}
                /> */}
                <Image
                  src="/hero/hero.webp"
                  alt="Hero image dark"
                  fill
                  sizes="100vw"
                  className={`absolute darsk:hidden bslock transition-opacity`}
                />
              </div>
              <Parallax />
            </div>

            {/* <Gradient /> */}
          </div>
          {/* <div className="absolute -z-50 -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <Image
              src={'/hero/hero-background.webp'}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div> */}

          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
