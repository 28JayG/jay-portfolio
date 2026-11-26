import { renderMonogram } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const Icon = () => {
  return renderMonogram(size.width);
};

export default Icon;
