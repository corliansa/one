import faviconLogo from "../assets/Favicon.svg";

export const Logo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className="h-8 min-h-8 w-8 min-w-8" src={faviconLogo.src} alt="" />
);
