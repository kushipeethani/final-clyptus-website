import React, { useState } from 'react';
import type { SliderCard, SpiralConfig } from '../data/sliderData';
import { Check, Copy, Code, Sparkles, Terminal, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CodePromptModalProps {
  card: SliderCard | null;
  config: SpiralConfig;
  onClose: () => void;
}

export const CodePromptModal: React.FC<CodePromptModalProps> = ({
  card,
  config,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');
  const [copied, setCopied] = useState<boolean>(false);

  if (!card) return null;

  const generatedCode = `// Spiral Slider Component generated from Scrolltide Studio
// Active preset: ${card.title} (${card.category})

import React, { useState } from 'react';

export const SpiralSliderPreset = ({ cards }) => {
  const [offset, setOffset] = useState(0);

  const radius = ${config.radius}; // px
  const pitch = ${config.pitch}; // px
  const tightness = ${config.tightness}; // turns
  const tiltAngle = ${config.tiltAngle}; // deg
  const perspective = ${config.perspective}; // px
  const glassBlur = ${config.glassBlur}; // px

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-slate-50">
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: \`\${perspective}px\` }}
      >
        <div 
          className="relative flex items-center justify-center"
          style={{
            transform: \`rotateX(\${tiltAngle}deg)\`,
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((card, i) => {
            const relIndex = i - offset;
            const angle = relIndex * ((2 * Math.PI * tightness) / cards.length);
            
            const x = Math.sin(angle) * radius;
            const y = relIndex * pitch;
            const z = Math.cos(angle) * radius;
            const zNorm = (z + radius) / (2 * radius);
            const isFront = z > 0;
            const rotY = (angle * 180) / Math.PI;

            return (
              <div
                key={card.id}
                className="absolute w-64 h-96 rounded-2xl transition-transform duration-300"
                style={{
                  transform: \`translate3d(\${x}px, \${y}px, \${z}px) rotateY(\${rotY}deg) scale(\${0.7 + zNorm * 0.3})\`,
                  opacity: isFront ? 0.95 : 0.45,
                  zIndex: Math.round((z + radius) * 10),
                  filter: !isFront ? \`blur(\${Math.min(10, (1 - zNorm) * glassBlur)}px)\` : 'none',
                }}
              >
                <div className="w-full h-full rounded-2xl bg-white border border-slate-200 p-4 shadow-md backdrop-blur-md">
                  <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover rounded-xl" />
                  <h3 className="mt-3 text-slate-900 font-bold">{card.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};`;

  const copyText = activeTab === 'prompt' ? card.prompt : generatedCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#10b981', '#6366f1']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Scrolltide Prompt & Component Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-200 bg-slate-50/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'prompt'
                  ? 'bg-sky-600 text-white shadow-md font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> AI Prompt
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'code'
                  ? 'bg-sky-600 text-white shadow-md font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> React Code Snippet
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-100 border border-sky-300 text-sky-700 hover:bg-sky-600 hover:text-white text-xs font-semibold transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Snippet'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[50vh] overflow-y-auto">
          {activeTab === 'prompt' ? (
            <div className="flex flex-col gap-3">
              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed font-mono whitespace-pre-wrap shadow-inner">
                {card.prompt}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-sky-600 shrink-0" /> Copy and paste this prompt into Cursor, Antigravity, Claude, or v0 to scaffold this exact component.
              </p>
            </div>
          ) : (
            <pre className="p-3 sm:p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
              <code>{generatedCode}</code>
            </pre>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-slate-500">
          <span>Preset: <strong className="text-sky-700 font-bold">{card.title}</strong></span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-500">Radius: {config.radius}px • Pitch: {config.pitch}px • Tilt: {config.tiltAngle}°</span>
        </div>
      </div>
    </div>
  );
};
