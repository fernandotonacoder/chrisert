import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const BackToTop = ({
  className,
  minHeight = 300,
  scrollTo = 0,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(document.documentElement.scrollTop >= minHeight);
    };

    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [minHeight]);

  return (
    <Button
      onClick={() =>
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        })
      }
      size="icon"
      aria-label="Voltar ao topo"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none",
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </Button>
  );
};

BackToTop.propTypes = {
  className: PropTypes.string,
  minHeight: PropTypes.number,
  scrollTo: PropTypes.number,
};
