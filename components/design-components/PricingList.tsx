
import { pricing } from "@/constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item,i) => (
        <div
          key={item.id}
          className="w-[19rem] text-primaryd dark:bdg-slate-950 max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
        <h4 
          className="text-2xl mb-4 font-medium sm:text-4xl "
          style={{color:i===0?'rgb(255 200 118)':i===1?'rgb(172 106 255)':'rgb(255 119 111)'}}
          >{item.name}</h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            <div className="h3">$</div>
            <div className="text-[5.5rem] ldeading-none font-bold">
              {item.price}
            </div>
          </div>

          <Button
            className="w-full mb-6"
            href={item.slug ? '/checkout/'+item.slug : ""}
          // white={!!item.price}
          >
            {item.slug ? "Get started" : "Free Consumable"}
          </Button>

          <ul>
            {item.inclusions.map((inclusion, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img src={inclusion.isIncluded ? '/check.svg' : '/cross.svg'} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{inclusion.label}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
