import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import { GraphemeSplitter } from '../utils/graphemeSplitter';

interface GifMakerOptions {
  text: string;
  speed: number;
  width: number;
  height: number;
}

export const useGifMaker = () => {
  const [gifUrl, setGifUrl] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const captureAreaRef = useRef<HTMLDivElement>(null);

  const captureFrames = async ({ text, speed, width, height }: GifMakerOptions) => {
    if (!captureAreaRef.current) return;
    setIsCapturing(true);
    const frameImages: string[] = [];
    const chars = GraphemeSplitter.splitGraphemes(text.trim());

    for (let i = 0; i < chars.length; i++) {
      captureAreaRef.current.innerText = chars[i];
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = await html2canvas(captureAreaRef.current, {
        scale: 2,
      });
      const dataURL = canvas.toDataURL('image/png');
      frameImages.push(dataURL);
    }

    gifshot.createGIF(
      {
        images: frameImages,
        interval: speed / 1000,
        gifWidth: width,
        gifHeight: height,
        numFrames: frameImages.length,
        frameDuration: 1,
        sampleInterval: 10,
      },
      function (obj) {
        if (!obj.error) {
          setGifUrl(obj.image);
          setIsCapturing(false);
        } else {
          console.error('GIF 생성 실패:', obj.errorMsg);
        }
      }
    );
  };

  return {
    gifUrl,
    isCapturing,
    captureAreaRef,
    captureFrames,
  };
};
