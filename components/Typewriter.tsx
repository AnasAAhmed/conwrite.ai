import { useEffect,  useState } from "react";
import Markdown from "react-markdown";

const TypeWriter = ({ isNewRes, txt }: { isNewRes: boolean; txt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speed = 18; // Typing speed in milliseconds

  useEffect(() => {
    if (isNewRes) {
      if (txt && currentIndex < txt.length) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => prevIndex + 7);
        }, speed);

        return () => clearInterval(interval);
      }
    }
  }, [currentIndex, txt, speed]);

  useEffect(() => {
    console.log('ss');
    
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
  });
  }, [currentIndex]);

  return (
    <div
      className="p-3 rounded-lg font-sans bg-primary-foreground dark:text-gray-300 whitespace-pre-wrap" // Add max height for better scrolling
    >
      <strong>AI:</strong> <Markdown>{isNewRes ? txt.slice(0, currentIndex) : txt}</Markdown>
    </div>
  );
};

export default TypeWriter;
