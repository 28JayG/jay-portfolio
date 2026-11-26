import { renderMonogram } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const AppleIcon = () => {
  return renderMonogram(size.width);
};

export default AppleIcon;
