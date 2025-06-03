import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface FormData {
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  speed: number;
  width: number;
  height: number;
  scale: number;
  fontFamily: string;
}

interface ControlsProps {
  initialValues: FormData;
  onCustomFontUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: FormData) => void;
}

export const Controls = ({ initialValues, onCustomFontUpload, onSubmit }: ControlsProps) => {
  const [formData, setFormData] = useState<FormData>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'range' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block">텍스트 입력:</label>
        <input type="text" name="text" value={formData.text} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block">배경 색상:</label>
          <input type="color" name="bgColor" value={formData.bgColor} onChange={handleChange} />
        </div>

        <div>
          <label className="mb-2 block">글자 색상:</label>
          <input type="color" name="textColor" value={formData.textColor} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label className="mb-2 block">글자 크기: {formData.fontSize}px</label>
        <input
          type="range"
          name="fontSize"
          min="24"
          max="120"
          value={formData.fontSize}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-2 block">프레임 간 속도: {formData.speed}ms</label>
        <input
          type="range"
          name="speed"
          min="50"
          max="1000"
          step="50"
          value={formData.speed}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-2 block">GIF 가로 크기: {formData.width}px</label>
        <input
          type="range"
          name="width"
          min="50"
          max="400"
          value={formData.width}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-2 block">GIF 세로 크기: {formData.height}px</label>
        <input
          type="range"
          name="height"
          min="50"
          max="400"
          value={formData.height}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-2 block">해상도 배율: {formData.scale}x</label>
        <input
          type="range"
          name="scale"
          min="1"
          max="16"
          step="1"
          value={formData.scale}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-2 block">폰트 선택:</label>
        <select name="fontFamily" value={formData.fontFamily} onChange={handleChange}>
          <option value='"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'>
            Emoji Default
          </option>
          <option value="system-ui">System UI</option>
          <option value="Noto Sans KR">Noto Sans KR</option>
          <option value="Arial">Arial</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Times New Roman'">Times New Roman</option>
          <option value="CustomFont">[업로드한 커스텀 폰트]</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block">📁 커스텀 폰트 파일 업로드 (.ttf/.woff)</label>
        <input type="file" accept=".ttf,.woff" onChange={onCustomFontUpload} />
      </div>

      <button type="submit" className="mt-6">
        캡처 및 GIF 생성
      </button>
    </form>
  );
};
