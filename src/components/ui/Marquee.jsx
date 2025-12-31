"use client";
import PropTypes from "prop-types";
import FastMarquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

export const Marquee = ({ className, ...props }) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    {...props}
  />
);

Marquee.propTypes = {
  className: PropTypes.string,
};

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}) => (
  <FastMarquee
    autoFill={autoFill}
    loop={loop}
    pauseOnHover={pauseOnHover}
    {...props}
  />
);

MarqueeContent.propTypes = {
  loop: PropTypes.number,
  autoFill: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

export const MarqueeFade = ({ className, side, ...props }) => (
  <div
    className={cn(
      "absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent",
      side === "left" ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l",
      className
    )}
    {...props}
  />
);

MarqueeFade.propTypes = {
  className: PropTypes.string,
  side: PropTypes.oneOf(["left", "right"]),
};

export const MarqueeItem = ({ className, ...props }) => (
  <div
    className={cn("mx-2 shrink-0 object-contain", className)}
    {...props}
  />
);

MarqueeItem.propTypes = {
  className: PropTypes.string,
};
