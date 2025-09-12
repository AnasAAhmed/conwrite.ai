import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient, Parallax } from "./design/Hero";
import Generating from "./Generating";
import CompanyLogos from "./CompanyLogos";
import { GradientRight, Gradient as GradientLeft } from "./design/Roadmap";
import { SplitText2 } from "../ui/split-text-ssr";

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
            text="Explore the Possibilities of"
            mode="words"
            className="relative z-10 mx-auto max-w-5xl text-center max-sm:text-xl text-2xl font-bold md:text-4xl lg:text-6xl not-light:text-slate-300"
            delayPerItem={0.06}
            duration={0.4}
            y={12}
          />
          <h1 className="h1-fade text-2xl font-semibold text-secondary-foreground md:text-4xl lg:text-6xl mb-6">
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
          </h1>
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
        <div className="relative mt-8 max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative hero-img-fadeUp z-1 p-1 rounded-2xl bg-[conic-gradient(from_225deg,#FFC876,#79FFF7,#9F53FF,#FF98E2,#FFC876)]">
            <div className="relative bg-[#19142b] rounded-[1rem]">
              <div className="aspect-[33/40] rounded-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={'/hero/robot.webp'}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <Parallax />
              </div>
            </div>

            <Gradient />
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
