import { useState } from 'react';
import { Controls } from './components/Controls';
import { CapturingSection } from './components/CapturePreview';
import { GifPreview } from './components/GifPreview';
import { useGifMaker } from './hooks/useGifMaker';
import { useCustomFont } from './hooks/useCustomFont';

function App() {
  const [formState, setFormState] = useState({
    text: '📦안녕😀',
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: 70,
    speed: 200,
    width: 100,
    height: 100,
    scale: 16,
    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
  });

  const { gifUrl, isCapturing, captureAreaRef, captureFrames } = useGifMaker();
  const { handleCustomFontUpload } = useCustomFont();

  const handleFormSubmit = (data: typeof formState) => {
    setFormState(data);
    captureFrames(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <h3 className="mb-10 text-2xl font-bold">한 글자씩 PNG 캡처 & GIF 생성기</h3>
        <p className="mb-6 text-gray-600">텍스트를 입력하고 옵션을 조정한 뒤 버튼을 클릭하세요.</p>

        <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
          <Controls
            initialValues={formState}
            onCustomFontUpload={handleCustomFontUpload}
            onSubmit={handleFormSubmit}
          />

          <CapturingSection
            width={formState.width}
            height={formState.height}
            fontSize={formState.fontSize}
            scale={formState.scale}
            bgColor={formState.bgColor}
            textColor={formState.textColor}
            fontFamily={formState.fontFamily}
            captureAreaRef={captureAreaRef}
          />
          {isCapturing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
            </div>
          )}
          <GifPreview gifUrl={gifUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;
