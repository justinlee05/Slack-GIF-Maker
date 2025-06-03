export const useCustomFont = () => {
  const handleCustomFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const fontData = event.target?.result;
      if (typeof fontData !== 'string') return;

      const style = document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: 'CustomFont';
          src: url('${fontData}');
        }
      `;
      document.head.appendChild(style);
      alert('✅ 커스텀 폰트 적용됨. [업로드한 커스텀 폰트] 선택하세요.');
    };
    reader.readAsDataURL(file);
  };

  return {
    handleCustomFontUpload,
  };
};
