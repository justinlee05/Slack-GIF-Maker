declare module 'gifshot' {
  interface GifshotOptions {
    images: string[];
    interval: number;
    gifWidth: number;
    gifHeight: number;
    numFrames: number;
    frameDuration: number;
    sampleInterval: number;
  }

  interface GifshotResult {
    error: boolean;
    errorMsg?: string;
    image: string;
  }

  function createGIF(
    options: GifshotOptions,
    callback: (result: GifshotResult) => void
  ): void;

  export { createGIF };
}

declare module 'html2canvas';

declare global {
  interface Intl {
    Segmenter: {
      new (
        locale?: string | string[] | undefined,
        options?: { granularity: 'grapheme' }
      ): {
        segment: (input: string) => {
          [Symbol.iterator](): Iterator<{ segment: string }>;
        };
      };
    };
  }
} 