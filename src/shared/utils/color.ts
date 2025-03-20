//HEX -> RGB 변환 함수
export function hexToRgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// r, g, b 컬러가 흰색과 유사한 색상인지 판별
export function isSimilarToWhite(r: number, g: number, b: number) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 220;
}
