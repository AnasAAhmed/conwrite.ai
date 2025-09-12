import ButtonSvg from "@/assets/svg/ButtonSvg";
import { ReactNode } from "react";
import SmartLink from "../SmartLink";


const Button = ({ inNewTab,className, title, href, onClick, children, px, white }: {inNewTab?:boolean; title?: string ;className?: string, href?: string, onClick?: () => void, children: ReactNode, px?: string, white?: boolean }) => {
  const classes = `relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${px || "px-7"
    } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button title={title||''} className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white: white || false })}
    </button>
  );

  const renderLink = () => (
    <SmartLink title={title||''} target={inNewTab?"_blank":""} href={href!} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white: white || false })}
    </SmartLink>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
