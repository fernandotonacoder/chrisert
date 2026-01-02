import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that resets scroll position on route change.
 * Must be placed inside a Router component.
 */
export const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
