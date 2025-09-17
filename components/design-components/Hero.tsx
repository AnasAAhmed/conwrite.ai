import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient, Parallax } from "./design/Hero";
import CompanyLogos from "./CompanyLogos";
import { GradientRight, Gradient as GradientLeft } from "./design/Roadmap";
import { SplitText2 } from "../ui/split-text-ssr";
import Image from "next/image";

const Hero = () => {

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings='s'
      id="hero"
    >
      <div className="container mt-7 sm:mt-16 relative ">
        <GradientRight />
        <GradientLeft />

        <div className="relative z-1 max-w-[72rem] mx-auto text-center mb-[2rem]">
          <SplitText2
            text="Explore the Possibilities of Content Generation with Conwrite.ai"
            mode="words"
            className="relative z-10 mx-auto max-w-5xl text-center max-sm:text-xl text-2xl font-bold md:text-4xl lg:text-6xl not-light:text-slate-300"
            delayPerItem={0.06}
            duration={0.4}
            y={12}
            highlightWords={[
              {word:'Content',color:"#818cf8"},
              {word:'Generation',color:"#6366f1"},
              {word:'Conwrite.ai',color:"#fde047 "},
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

            <Button px="sm:px-7 px-3" href="/#how-to-use">
              How To Use
            </Button>
            <Button px="sm:px-7 px-3" href="/dashboard">
              Get started
            </Button>
          </div>
        </div>
        <div className="relative mx-auto md:max-w-6xl">
          <div className="hero-img-fadeUp relative z-1 p-0.5 rounded-2xl bg-[conic-gradient(from_225deg,#FFC876,#79FFF7,#9F53FF,#FF98E2,#FFC876)]">
            <div className="relative bg-[#19142b] rounded-[1rem]">
              <div className="rounded-[0.9rem] overflow-hidden">
                <Image
                  src="/hero/hero.png"
                  className="w-full dark:block hidden aspect-[4/5] sm:aspect-[16/9] object-cover"
                  width={1224}
                  height={890}
                  alt="Hero image dark"
                />
                <Image
                  src="/hero/hero-light.png"
                  className="w-full  dark:hidden block aspect-[4/5] sm:aspect-[16/9] object-cover"
                  width={1224}
                  height={890}
                  alt="Hero image light"
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
