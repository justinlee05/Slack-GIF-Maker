import type { RefObject } from 'react';

interface CapturePreviewProps {
  width: number;
  height: number;
  fontSize: number;
  scale: number;
  bgColor: string;
  textColor: string;
  fontFamily: string;
  captureAreaRef: RefObject<HTMLDivElement>;
}

export const CapturingSection = ({
  width,
  height,
  fontSize,
  scale,
  bgColor,
  textColor,
  fontFamily,
  captureAreaRef,
}: CapturePreviewProps) => {
  return (
    <div
      ref={captureAreaRef}
      className="capture-preview fixed -top-[500%] border-none font-bold shadow-none"
      style={{
        width: width * scale + 'px',
        height: height * scale + 'px',
        fontSize: fontSize * scale + 'px',
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: fontFamily,
      }}
    />
  );
};
