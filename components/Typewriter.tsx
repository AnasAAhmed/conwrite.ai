import { useEffect,  useState } from "react";

const TypeWriter = ({ isNewRes, txt }: { isNewRes: boolean; txt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speed = 7; // Typing speed in milliseconds

  useEffect(() => {
    if (isNewRes) {
      if (txt && currentIndex < txt.length) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, speed);

        return () => clearInterval(interval);
      }
    }
  }, [currentIndex, txt, speed]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
  });
  }, [currentIndex]);

  return (
    <pre
      className="p-3 rounded-lg font-sans bg-primary-foreground dark:text-gray-300 whitespace-pre-wrap" // Add max height for better scrolling
    >
      <strong>AI:</strong> {isNewRes ? txt.slice(0, currentIndex) : txt}
    </pre>
  );
};

export default TypeWriter;
