import { hexToRgb, isSimilarToWhite } from "../utils/color";

interface Props {
  text: string;
  color: string;
}

export default function IssueLabel({ text, color }: Props) {
  const { r, g, b } = hexToRgb(color);
  const isLightColor = isSimilarToWhite(r, g, b);
  const textColor = isLightColor ? "#000" : color;
  return (
    <span
      className="px-2 py-1 text-xs font-semibold rounded-full border items-center"
      style={{
        background: "white",
        borderColor: textColor,
        color: textColor,
      }}
    >
      {text}
    </span>
  );
}
