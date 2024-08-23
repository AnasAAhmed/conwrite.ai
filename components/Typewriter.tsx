import { useEffect, useRef, useState } from "react";

const TypeWriter = ({ txt }: { txt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLPreElement>(null);

  const speed = 7; // Typing speed in milliseconds

  useEffect(() => {
    if (txt && currentIndex < txt.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearInterval(interval);
    }
  }, [currentIndex, txt, speed]);

  useEffect(() => {
    // Scroll the container to the bottom as text is typed out
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentIndex]);

  return (
    <pre
      ref={containerRef}
      className="mt-2 dark:text-gray-300 whitespace-pre-wrap w-full overflow-auto max-h-96" // Add max height for better scrolling
    >
      <strong>AI:</strong> {txt.slice(0, currentIndex)}
    </pre>
  );
};

export default TypeWriter;
