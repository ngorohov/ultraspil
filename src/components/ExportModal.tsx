import React, { useRef, useState } from 'react';
import { ALBUM_DATA } from '../data/albumData';
import { Download, X, Check, Image as ImageIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateHighRes = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = ALBUM_DATA.frontCoverImage;

    img.onload = () => {
      // 1. Draw base image
      ctx.drawImage(img, 0, 0, 1200, 1200);

      // 2. Gradients & Vignettes
      const gradTop = ctx.createLinearGradient(0, 0, 0, 450);
      gradTop.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      gradTop.addColorStop(0.6, 'rgba(0, 0, 0, 0.5)');
      gradTop.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradTop;
      ctx.fillRect(0, 0, 1200, 450);

      const gradBottom = ctx.createLinearGradient(0, 850, 0, 1200);
      gradBottom.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradBottom.addColorStop(0.6, 'rgba(0, 0, 0, 0.7)');
      gradBottom.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradBottom;
      ctx.fillRect(0, 850, 1200, 350);

      // 3. Ornate gold border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 1160, 1160);

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 1140, 1140);

      // 4. Subtitle: "ОРДЕН УЛЬТРАМАРИНОВ"
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 22px Cinzel, serif';
      ctx.fillText('ОРДЕН УЛЬТРАМАРИНОВ • СЕРИЯ «ШАНСОН ТЕРРЫ»', 600, 80);

      // 5. Artist: "Брат Михаил"
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'italic 34px "Playfair Display", Georgia, serif';
      ctx.fillText('Брат Михаил', 600, 128);

      // 6. MAIN TITLE: "ЗАЛЕТЕЛ РАСПИЛ"
      ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;

      ctx.font = '900 86px "Russo One", sans-serif';
      const textGrad = ctx.createLinearGradient(0, 140, 0, 230);
      textGrad.addColorStop(0, '#fffbeb');
      textGrad.addColorStop(0.3, '#fcd34d');
      textGrad.addColorStop(0.7, '#f59e0b');
      textGrad.addColorStop(1, '#b45309');

      ctx.fillStyle = textGrad;
      ctx.fillText('ЗАЛЕТЕЛ РАСПИЛ', 600, 220);

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Underline bar
      const barGrad = ctx.createLinearGradient(300, 0, 900, 0);
      barGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      barGrad.addColorStop(0.5, 'rgba(245, 158, 11, 1)');
      barGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = barGrad;
      ctx.fillRect(300, 240, 600, 4);

      // Subtitle
      ctx.fillStyle = '#fef08a';
      ctx.font = '600 20px "Marcellus", serif';
      ctx.fillText('ПЕСНИ 41-ГО ТЫСЯЧЕЛЕТИЯ • АКУСТИЧЕСКИЙ АЛЬБОМ', 600, 275);

      // 7. Hit Single Badge (Bottom Left)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(50, 1040, 460, 100);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 1040, 460, 100);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 18px Cinzel, serif';
      ctx.fillText('ВКЛЮЧАЕТ БОЕВОЙ ХИТ:', 70, 1075);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic bold 24px "Playfair Display", Georgia, serif';
      ctx.fillText('«Цепной меч-разлука»', 70, 1115);

      // 8. Warning Sticker (Bottom Right)
      ctx.fillStyle = '#0c0a09';
      ctx.fillRect(870, 1040, 270, 100);
      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 3;
      ctx.strokeRect(870, 1040, 270, 100);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fafaf9';
      ctx.font = '900 18px "Russo One", sans-serif';
      ctx.fillText('ВНИМАНИЕ', 1005, 1070);

      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(890, 1078);
      ctx.lineTo(1120, 1078);
      ctx.stroke();

      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('СОДЕРЖИТ ЗВУКИ', 1005, 1100);
      ctx.fillText('РАБОТАЮЩЕГО ЦЕПНОГО МЕЧА', 1005, 1120);

      const url = canvas.toDataURL('image/png');
      setPreviewUrl(url);
      setIsGenerating(false);
      setDownloadReady(true);
    };
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'Zaletel_Raspil_Warhammer_40k_Chanson.png';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-stone-900 border border-amber-600/50 rounded-xl w-full max-w-xl p-5 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <h3 className="font-chanson text-lg font-bold text-amber-100">
              Экспорт обложки альбома (1200×1200)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 text-center">
          {previewUrl ? (
            <div className="relative aspect-square max-w-[340px] mx-auto rounded-lg overflow-hidden border-2 border-amber-500/60 shadow-xl mb-4">
              <img src={previewUrl} alt="Export Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-stone-700 rounded-lg my-4 text-stone-400 text-sm">
              <p>Нажмите кнопку ниже для генерации чистого файла обложки высокого разрешения</p>
              <p className="text-xs text-amber-400/80 mt-1">
                (Включает надпись «ЗАЛЕТЕЛ РАСПИЛ», арты ультрамарина с цепным мечом и все золотые элементы)
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 mt-2">
            {!downloadReady ? (
              <button
                onClick={generateHighRes}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-bold px-5 py-2.5 rounded-lg shadow-lg cursor-pointer transition-all disabled:opacity-50"
              >
                <ImageIcon className="w-4 h-4" />
                <span>{isGenerating ? 'Рендеринг...' : 'Сгенерировать постер'}</span>
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-lg shadow-lg cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Скачать PNG (1200×1200)</span>
              </button>
            )}
          </div>
        </div>

        {/* Hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
