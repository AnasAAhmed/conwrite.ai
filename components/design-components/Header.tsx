'use client'

// import { disablePageScroll, enablePageScroll } from "scroll-lock";

// import Button from "./Button";
// import { HamburgerMenu } from "./design/Header";
import { Suspense,  } from "react";
import { navigation } from "@/constants";
// import MenuSvg from "@/assets/svg/MenuSvg";
import AuthModal from "../AuthModal";
import SmartLink from "../SmartLink";

const Header = () => {
  // const [openNavigation, setOpenNavigation] = useState(false);

  // const toggleNavigation = () => {
  //   if (openNavigation) {
  //     setOpenNavigation(false);
  //     enablePageScroll();
  //   } else {
  //     setOpenNavigation(true);
  //     disablePageScroll();
  //   }
  // };

  const handleClick = () => {
    // if (!openNavigation) return;

    // enablePageScroll();
    // setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 bg-prsimary-foreground border-b border-n-6 lg:backdrop-blur-sm `}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-2">
        <SmartLink className="block w-24 xl:mr-8" href="/#hero">
          <img src={'/logo.svg'} className="dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert" width={190} height={40} alt="Conwrite.ai" />
        </SmartLink>

        <nav
          className={` hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <SmartLink
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block hover:text-indigo-500 relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </SmartLink>
            ))}
            
          </div>

          {/* <HamburgerMenu /> */}
        </nav>

      <Suspense fallback={<div className='h-5 w-16 p-1 rounded-md bg-gray-300 animate-pulse' />}>
              <AuthModal />
            </Suspense>

        {/* <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button> */}
      </div>
    </div>
  );
};

export default Header;
