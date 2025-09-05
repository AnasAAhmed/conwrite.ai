import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient, Parallax  } from "./design/Hero";
import Generating from "./Generating";
import CompanyLogos from "./CompanyLogos";
import { GradientRight ,Gradient as GradientLeft} from "./design/Roadmap";

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
          <GradientRight/>
          <GradientLeft/>

        <div className="relative z-1 max-w-[72rem] mx-auto text-center mb-[2rem]">
          <h1 className="h1-fade text-3xl font-semibold text-secondary-foreground md:text-5xl lg:text-6xl mb-6">
            Explore the Possibilities of<span className="bg-clip-text bg-gradient-to-tl from-blue-400 to-violet-600  text-transparent">&nbsp;Content Generation</span> with {` `}
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
          <p style={{fontWeight:'50'}} className="p-fade max-w-3xl text-muted-foreground mx-auto mb-6 text-sm md:text-xl lg:text-2xl  lg:mb-8">
            Revolutionize your content creation with our AI-Agents, delivering engaging and high-quality text in seconds.
          </p> 
          <Button href="/#how-to-use" className="btns-fade">
           How To Use
          </Button>
          <Button href="/?auth=sign-in" className="btns-fade ml-4">
            Get started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative hero-img-fadeUp z-1 p-1 rounded-2xl bg-[conic-gradient(from_225deg,#FFC876,#79FFF7,#9F53FF,#FF98E2,#FFC876)]">
            <div className="relative bg-[#19142b] rounded-[1rem]">
              <div className="aspect-[33/40] rounded-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={'/hero/robot.jpg'}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <Parallax/>
              </div>
            </div>

            <Gradient />
          </div>
          {/* <div className="absolute -z-50 -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <Image
              src={'/hero/hero-background.jpg'}
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
