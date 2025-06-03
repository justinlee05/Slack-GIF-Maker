interface GifPreviewProps {
  gifUrl: string;
}

export const GifPreview = ({ gifUrl }: GifPreviewProps) => {
  if (!gifUrl) return null;

  return (
    <div className="mt-8 text-center">
      <img src={gifUrl} alt="Generated GIF" className="mx-auto rounded-lg shadow-md" />
      <a href={gifUrl} download="output.gif" className="download-button inline-block">
        GIF 다운로드
      </a>
    </div>
  );
};
