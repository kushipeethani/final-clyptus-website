import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { 
  Sparkles, Calendar, UserCheck, X, ArrowRight, ArrowLeft, Search, 
  Lock, Unlock, PenTool, LogOut, AlertCircle, CheckCircle2, Upload, Trash2, Pencil, Loader2,
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Minus,
  Undo, Redo, Palette, Highlighter,
  FileText, ExternalLink, FileCheck, Download,
  Eye, EyeOff, ShieldCheck, User
} from 'lucide-react';
import { CLYPTUS_OFFICIAL_BLOGS } from '../data/blogsData';
import { extractTextFromPdfFile, getPdfBlobUrl } from '../utils/pdfExtractor';

interface BlogsPageProps {
  onNavigateContact?: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime?: string;
  bannerImage: string;
  excerpt: string;
  fullContent: React.ReactNode;
  rawContent?: string;
  isEdited?: boolean;
  pdfUrl?: string;
  pdfFileName?: string;
  pdfFileSize?: string;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Clyptus Culture Story':
      return 'bg-sky-50 text-sky-700 border-sky-200/80';
    case 'ERP & SAP':
    case 'SAP Insights & Tech':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    case 'Talent Acquisition':
    case 'IT Recruitment':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    case 'AI & Generative AI':
    case 'Enterprise & AI':
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200/80';
  }
};

const isHtmlContent = (text: string): boolean => {
  if (!text) return false;
  return /<[a-z][\s\S]*>/i.test(text);
};

const formatContentToHtml = (content: string): string => {
  if (!content) return '';
  if (isHtmlContent(content)) {
    return content;
  }
  const paras = content.split('\n\n').filter((p) => p.trim().length > 0);
  return paras
    .map((p) => {
      const trimmed = p.trim();
      if (trimmed.startsWith('# ')) {
        return `<h1>${trimmed.replace(/^#\s+/, '')}</h1>`;
      }
      if (trimmed.startsWith('## ')) {
        return `<h2>${trimmed.replace(/^##\s+/, '')}</h2>`;
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((li) => `<li>${li.replace(/^-\s*/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
};

const renderCustomContent = (excerpt: string, rawContent: string): React.ReactNode => {
  const hasContent = Boolean(rawContent && rawContent.trim().length > 0);
  const rawHtml = hasContent
    ? (isHtmlContent(rawContent) ? rawContent : formatContentToHtml(rawContent))
    : '';

  // Sanitize strictly using DOMPurify with secure allowlist to prevent XSS
  const sanitizedHtml = rawHtml
    ? DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          'p', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'span', 'img', 'hr',
          'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'center'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'style', 'width', 'height', 'align'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
      })
    : '';

  return (
    <div className="space-y-6 text-slate-800">
      {excerpt && (
        <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-medium pb-6 border-b border-slate-200">
          {excerpt}
        </p>
      )}
      {hasContent && (
        <div 
          className="rich-article-body text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
        />
      )}
    </div>
  );
};


// ---------------------------------------------------------------------------
// Rich Text Editor Component for Article Writing & Formatting
// ---------------------------------------------------------------------------
const COLOR_SWATCHES = [
  { name: 'Slate Black', color: '#0f172a' },
  { name: 'Clyptus Sky Blue', color: '#0284c7' },
  { name: 'Royal Indigo', color: '#4f46e5' },
  { name: 'Emerald Green', color: '#059669' },
  { name: 'Crimson Rose', color: '#e11d48' },
  { name: 'Amber Gold', color: '#d97706' },
  { name: 'Vibrant Purple', color: '#7c3aed' },
  { name: 'Slate Gray', color: '#64748b' },
];

const HIGHLIGHT_SWATCHES = [
  { name: 'None', color: 'transparent' },
  { name: 'Sunny Yellow', color: '#fef08a' },
  { name: 'Sky Cyan', color: '#bae6fd' },
  { name: 'Mint Green', color: '#bbf7d0' },
  { name: 'Soft Rose', color: '#fbcfe8' },
];

const FONT_OPTIONS = [
  { label: 'Inter (Modern Sans)', value: 'Inter, system-ui, -apple-system, sans-serif' },
  { label: 'Arial (Clean Sans)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Calibri (Standard Sans)', value: 'Calibri, Candara, Segoe, sans-serif' },
  { label: 'Georgia (Classic Serif)', value: 'Georgia, Cambria, serif' },
  { label: 'Times New Roman (Serif)', value: "'Times New Roman', Times, serif" },
  { label: 'Courier New (Monospace)', value: "'Courier New', Courier, monospace" },
];

const SIZE_OPTIONS = [
  { label: 'Normal (16px)', styleSize: '16px' },
  { label: 'Small (13px)', styleSize: '13px' },
  { label: 'Medium (18px)', styleSize: '18px' },
  { label: 'Large (22px)', styleSize: '22px' },
  { label: 'Title (28px)', styleSize: '28px' },
  { label: 'Display (34px)', styleSize: '34px' },
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your article here...',
  minHeight = '240px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const highlightPickerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#0f172a');

  // Initialize and enable CSS-based styling & paragraph separators
  useEffect(() => {
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
      document.execCommand('styleWithCSS', false, 'true');
    } catch (_) {}
  }, []);

  // Initialize and sync content when value changes externally
  useEffect(() => {
    if (editorRef.current) {
      const activeEl = document.activeElement;
      if (!editorRef.current.contains(activeEl)) {
        const formatted = formatContentToHtml(value);
        if (editorRef.current.innerHTML !== formatted) {
          editorRef.current.innerHTML = formatted;
        }
      }
    }
  }, [value]);

  // Close color popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(e.target as Node)) {
        setShowHighlightPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (cmd: string, val: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    try {
      document.execCommand('styleWithCSS', false, 'true');
    } catch (_) {}
    document.execCommand(cmd, false, val);
    triggerChange();
  };

  const setAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    try {
      document.execCommand('styleWithCSS', false, 'true');
    } catch (_) {}

    const cmdMap = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull',
    };
    document.execCommand(cmdMap[align], false, undefined);

    // Apply alignment directly to the enclosing block node
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let node: Node | null = selection.anchorNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          const tagName = el.tagName.toLowerCase();
          if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(tagName)) {
            el.style.textAlign = align;
            break;
          }
        }
        node = node.parentNode;
      }
    }
    triggerChange();
  };

  const applyCustomFontSize = (sizePx: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      exec('fontSize', '4');
      return;
    }
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = sizePx;
    span.appendChild(range.extractContents());
    range.insertNode(span);

    // Keep the new span selected
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);
    triggerChange();
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-300 bg-white shadow-xs focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/30 transition-all">
      {/* SCOPED STYLING TO ENSURE BULLET POINTS & TEXT ALIGNMENTS RENDER PROPERLY */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .rich-editor-canvas, .rich-article-body {
              text-align: left;
            }
            .rich-editor-canvas [style*="text-align: center"], .rich-article-body [style*="text-align: center"],
            .rich-editor-canvas [style*="text-align:center"], .rich-article-body [style*="text-align:center"],
            .rich-editor-canvas [align="center"], .rich-article-body [align="center"],
            .rich-editor-canvas center, .rich-article-body center {
              text-align: center !important;
            }
            .rich-editor-canvas [style*="text-align: right"], .rich-article-body [style*="text-align: right"],
            .rich-editor-canvas [style*="text-align:right"], .rich-article-body [style*="text-align:right"],
            .rich-editor-canvas [align="right"], .rich-article-body [align="right"] {
              text-align: right !important;
            }
            .rich-editor-canvas [style*="text-align: left"], .rich-article-body [style*="text-align: left"],
            .rich-editor-canvas [style*="text-align:left"], .rich-article-body [style*="text-align:left"],
            .rich-editor-canvas [align="left"], .rich-article-body [align="left"] {
              text-align: left !important;
            }
            .rich-editor-canvas [style*="text-align: justify"], .rich-article-body [style*="text-align: justify"],
            .rich-editor-canvas [style*="text-align:justify"], .rich-article-body [style*="text-align:justify"],
            .rich-editor-canvas [align="justify"], .rich-article-body [align="justify"] {
              text-align: justify !important;
            }
            .rich-editor-canvas ul, .rich-article-body ul {
              list-style-type: disc !important;
              padding-left: 1.75rem !important;
              margin-top: 0.6rem !important;
              margin-bottom: 0.6rem !important;
            }
            .rich-editor-canvas ol, .rich-article-body ol {
              list-style-type: decimal !important;
              padding-left: 1.75rem !important;
              margin-top: 0.6rem !important;
              margin-bottom: 0.6rem !important;
            }
            .rich-editor-canvas li, .rich-article-body li {
              display: list-item !important;
              margin-top: 0.25rem !important;
              margin-bottom: 0.25rem !important;
              padding-left: 0.25rem !important;
            }
            .rich-editor-canvas p, .rich-article-body p {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
              line-height: 1.75;
            }
            .rich-editor-canvas h1, .rich-article-body h1 {
              font-size: 1.85rem !important;
              font-weight: 800 !important;
              margin-top: 1.25rem !important;
              margin-bottom: 0.5rem !important;
              line-height: 1.2 !important;
            }
            .rich-editor-canvas h2, .rich-article-body h2 {
              font-size: 1.5rem !important;
              font-weight: 700 !important;
              margin-top: 1rem !important;
              margin-bottom: 0.4rem !important;
              line-height: 1.25 !important;
            }
            .rich-editor-canvas h3, .rich-article-body h3 {
              font-size: 1.25rem !important;
              font-weight: 600 !important;
              margin-top: 0.75rem !important;
              margin-bottom: 0.35rem !important;
              line-height: 1.3 !important;
            }
            .rich-editor-canvas blockquote, .rich-article-body blockquote {
              border-left: 4px solid #0284c7 !important;
              padding: 0.5rem 1rem !important;
              margin: 0.75rem 0 !important;
              background-color: #f8fafc !important;
              font-style: italic !important;
              border-radius: 0 0.5rem 0.5rem 0 !important;
            }
            .rich-editor-canvas hr, .rich-article-body hr {
              border: none !important;
              border-top: 1px solid #e2e8f0 !important;
              margin: 1.25rem 0 !important;
            }
            .rich-editor-canvas table, .rich-article-body table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 1.5rem 0 !important;
            }
            .rich-editor-canvas th, .rich-article-body th {
              background-color: #f8fafc !important;
              color: #0f172a !important;
              font-weight: 700 !important;
              padding: 0.75rem 1rem !important;
              border: 1px solid #e2e8f0 !important;
              font-size: 0.875rem !important;
              text-align: left !important;
            }
            .rich-editor-canvas td, .rich-article-body td {
              padding: 0.75rem 1rem !important;
              border: 1px solid #e2e8f0 !important;
              font-size: 0.95rem !important;
              vertical-align: top !important;
              line-height: 1.6 !important;
              text-align: left !important;
            }
          `,
        }}
      />

      {/* TOOLBAR */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5 select-none text-slate-700 text-xs rounded-t-2xl">
        {/* Font Family (6 Most Common Standard Fonts) */}
        <select
          onChange={(e) => {
            const font = e.target.value;
            exec('fontName', font);
          }}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-2xs"
          title="Font Family"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => {
            applyCustomFontSize(e.target.value);
          }}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-2xs"
          title="Font Size"
        >
          {SIZE_OPTIONS.map((s) => (
            <option key={s.label} value={s.styleSize}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Bold, Italic, Underline, Strikethrough */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('bold');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors font-bold cursor-pointer"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('italic');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('underline');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('strikeThrough');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Text Color Picker - Perfectly Aligned */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowHighlightPicker(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200 bg-white shadow-2xs"
            title="Text Color"
          >
            <Palette className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-[11px] font-semibold text-slate-700 hidden sm:inline">Color</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 shadow-2xs"
              style={{ backgroundColor: currentColor }}
            />
          </button>

          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 w-56 space-y-2.5 animate-in fade-in zoom-in-95">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Choose Text Color
              </span>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.color}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setCurrentColor(swatch.color);
                      exec('foreColor', swatch.color);
                      setShowColorPicker(false);
                    }}
                    className="w-8 h-8 rounded-lg border border-slate-200 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  >
                    {currentColor === swatch.color && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 text-[11px] font-semibold">Custom:</span>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => {
                    const col = e.target.value;
                    setCurrentColor(col);
                    exec('foreColor', col);
                  }}
                  className="w-8 h-7 rounded cursor-pointer border border-slate-200 bg-white p-0.5"
                />
              </div>
            </div>
          )}
        </div>

        {/* Highlight Color Picker - Perfectly Aligned */}
        <div className="relative" ref={highlightPickerRef}>
          <button
            type="button"
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowColorPicker(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200 bg-white shadow-2xs"
            title="Highlight Text"
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-semibold text-slate-700 hidden sm:inline">Highlight</span>
          </button>

          {showHighlightPicker && (
            <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 w-48 space-y-2 animate-in fade-in zoom-in-95">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Highlight Color
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {HIGHLIGHT_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      exec('hiliteColor', swatch.color);
                      setShowHighlightPicker(false);
                    }}
                    className="w-7 h-7 rounded-md border border-slate-300 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  >
                    {swatch.color === 'transparent' && '✕'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Points Section (Bullet & Numbered Lists) */}
        <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              exec('insertUnorderedList');
            }}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer flex items-center gap-1"
            title="Bullet Points"
          >
            <List className="w-4 h-4 text-sky-600" />
            <span className="text-[11px] font-semibold text-slate-700 hidden md:inline">Points</span>
          </button>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              exec('insertOrderedList');
            }}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer flex items-center gap-1"
            title="Numbered Points"
          >
            <ListOrdered className="w-4 h-4 text-indigo-600" />
            <span className="text-[11px] font-semibold text-slate-700 hidden md:inline">1. 2. 3.</span>
          </button>
        </div>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Alignment */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setAlignment('left');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setAlignment('center');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setAlignment('right');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setAlignment('justify');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Quote & Divider */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('formatBlock', '<blockquote>');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Quote Block"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('insertHorizontalRule');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Insert Horizontal Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Undo, Redo */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('undo');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec('redo');
          }}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* EDITABLE WRITING CANVAS */}
      <div
        ref={editorRef}
        contentEditable
        onInput={triggerChange}
        onBlur={triggerChange}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="p-4 sm:p-5 outline-none rich-editor-canvas rich-article-body text-slate-900 text-base leading-relaxed overflow-y-auto max-h-[420px] rounded-b-2xl empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// IndexedDB & Image Compression Storage Helpers
// Prevents QuotaExceededError and ensures blogs persist across page refreshes
// ---------------------------------------------------------------------------
const IDB_DB_NAME = 'clyptus_blogs_db';
const IDB_STORE_NAME = 'blogs_store';
const IDB_KEY = 'managed_blogs_key';

function openBlogsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open(IDB_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveBlogsToIDB(data: any[]): Promise<void> {
  return new Promise(async (resolve) => {
    try {
      const db = await openBlogsDB();
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(IDB_STORE_NAME);
      store.put(data, IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => {
        console.warn('IDB tx error:', tx.error);
        resolve();
      };
    } catch (err) {
      console.warn('IndexedDB save warning:', err);
      resolve();
    }
  });
}

async function getBlogsFromIDB(): Promise<any[] | null> {
  try {
    const db = await openBlogsDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readonly');
      const store = tx.objectStore(IDB_STORE_NAME);
      const request = store.get(IDB_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Compresses an uploaded image file using an offscreen HTML5 canvas.
 * Reduces file sizes from 2MB-15MB down to ~40KB-80KB, ensuring localStorage
 * never exceeds its quota and blog images load instantly across page refreshes.
 */
function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file data'));
      }
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(reader.result as string);
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-optimized JPEG data URL with quality 0.78
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
        resolve(compressedDataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const INITIAL_BLOG_POSTS: BlogPost[] = CLYPTUS_OFFICIAL_BLOGS.map((b) => ({
  ...b,
  fullContent: renderCustomContent(b.excerpt, b.rawContent),
}));

const saveBlogsToLocalStorage = async (list: BlogPost[]) => {
  const serialized = list.map((b) => ({
    id: b.id,
    title: b.title,
    category: b.category,
    categoryColor: b.categoryColor,
    author: b.author,
    authorRole: b.authorRole,
    date: b.date,
    bannerImage: b.bannerImage,
    excerpt: b.excerpt,
    rawContent: b.rawContent || b.excerpt,
    isEdited: (b as any).isEdited || false,
    pdfUrl: b.pdfUrl,
    pdfFileName: b.pdfFileName,
    pdfFileSize: b.pdfFileSize,
  }));

  // 1. Asynchronously persist full data including compressed images and PDF documents to IndexedDB
  await saveBlogsToIDB(serialized);

  // 2. Persist to localStorage for synchronous instant reload on next boot
  try {
    localStorage.setItem('clyptus_managed_blogs', JSON.stringify(serialized));
  } catch (err) {
    console.warn('LocalStorage quota limit reached, saving with lightweight fallback:', err);
    try {
      const fallback = serialized.map((item) => ({
        ...item,
        bannerImage: item.bannerImage.startsWith('data:') && item.bannerImage.length > 150000
          ? '/milestone_2023_2025.jpg'
          : item.bannerImage,
        pdfUrl: item.pdfUrl && item.pdfUrl.length > 300000 ? undefined : item.pdfUrl,
      }));
      localStorage.setItem('clyptus_managed_blogs', JSON.stringify(fallback));
    } catch (fallbackErr) {
      console.error('Failed to save to localStorage fallback:', fallbackErr);
    }
  }
};

export const BlogsPage: React.FC<BlogsPageProps> = ({ onNavigateContact }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogHistory, setBlogHistory] = useState<BlogPost[]>([]);
  const [pdfViewerBlobUrl, setPdfViewerBlobUrl] = useState<string>('');
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'All' | 'Technical' | 'Festival'>('All');

  // Sync and convert PDF data URL to safe Blob URL when blog is opened
  useEffect(() => {
    if (selectedBlog?.pdfUrl) {
      const blobUrl = getPdfBlobUrl(selectedBlog.pdfUrl);
      setPdfViewerBlobUrl(blobUrl);
      return () => {
        if (blobUrl && blobUrl.startsWith('blob:')) {
          URL.revokeObjectURL(blobUrl);
        }
      };
    } else {
      setPdfViewerBlobUrl('');
    }
  }, [selectedBlog?.id, selectedBlog?.pdfUrl]);

  // Reset modal scroll to top when opening or switching blogs
  useEffect(() => {
    if (selectedBlog && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [selectedBlog]);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('clyptus_blog_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [authUsername, setAuthUsername] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [showAuthPassword, setShowAuthPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore session from server if already authenticated as Audit
  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data) => {
        if (data.authenticated && data.user?.role === 'audit') {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {});
  }, []);

  // Create Blog Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Clyptus Culture Story');
  const [newAuthor, setNewAuthor] = useState<string>('Audit');
  const [newAuthorRole, setNewAuthorRole] = useState<string>('Audit & Tech Lead');
  const [newBannerImage, setNewBannerImage] = useState<string>('');
  const [bannerFileName, setBannerFileName] = useState<string>('');
  const [newExcerpt, setNewExcerpt] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Edit Blog Form State
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('Clyptus Culture Story');
  const [editAuthor, setEditAuthor] = useState<string>('');
  const [editAuthorRole, setEditAuthorRole] = useState<string>('');
  const [editBannerImage, setEditBannerImage] = useState<string>('');
  const [editBannerFileName, setEditBannerFileName] = useState<string>('');
  const [editExcerpt, setEditExcerpt] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editFormError, setEditFormError] = useState<string>('');

  // Delete Blog State
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);

  // Processing indicators for image compression
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [isProcessingEditImage, setIsProcessingEditImage] = useState<boolean>(false);

  // PDF Document State for Create Blog
  const [newPdfUrl, setNewPdfUrl] = useState<string>('');
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [pdfFileSize, setPdfFileSize] = useState<string>('');
  const [isProcessingPdf, setIsProcessingPdf] = useState<boolean>(false);

  // PDF Document State for Edit Blog
  const [editPdfUrl, setEditPdfUrl] = useState<string>('');
  const [editPdfFileName, setEditPdfFileName] = useState<string>('');
  const [editPdfFileSize, setEditPdfFileSize] = useState<string>('');
  const [isProcessingEditPdf, setIsProcessingEditPdf] = useState<boolean>(false);

  // Managed Blogs stored in localStorage with fallback and IndexedDB rehydration
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      let saved = localStorage.getItem('clyptus_managed_blogs');
      if (!saved) {
        saved = localStorage.getItem('clyptus_custom_blogs');
      }
      if (saved) {
        const parsed: any[] = JSON.parse(saved);
        const mappedSaved: BlogPost[] = parsed.map((item) => {
          const initialMatch = INITIAL_BLOG_POSTS.find((b) => b.id === item.id);
          if (initialMatch) {
            return {
              ...initialMatch,
              ...item,
              rawContent: initialMatch.rawContent,
              fullContent: renderCustomContent(initialMatch.excerpt, initialMatch.rawContent || ''),
            };
          }
          return {
            ...item,
            fullContent: renderCustomContent(item.excerpt, item.rawContent || item.excerpt),
          };
        });

        // Ensure all 10 new blogs from INITIAL_BLOG_POSTS are included even if user previously had old 3 blogs saved!
        const savedIds = new Set(parsed.map((p) => p.id));
        const missingInitial = INITIAL_BLOG_POSTS.filter((b) => !savedIds.has(b.id));

        return [...mappedSaved, ...missingInitial];
      }
    } catch (e) {
      console.error('Error loading initial blogs from localStorage:', e);
    }
    return INITIAL_BLOG_POSTS;
  });

  // Rehydrate blogs from IndexedDB if available (guarantees persistence across refreshes)
  useEffect(() => {
    getBlogsFromIDB().then((idbBlogs) => {
      if (idbBlogs && Array.isArray(idbBlogs) && idbBlogs.length > 0) {
        const mappedIdb: BlogPost[] = idbBlogs.map((item) => {
          const initialMatch = INITIAL_BLOG_POSTS.find((b) => b.id === item.id);
          if (initialMatch) {
            return {
              ...initialMatch,
              ...item,
              rawContent: initialMatch.rawContent,
              fullContent: renderCustomContent(initialMatch.excerpt, initialMatch.rawContent || ''),
            };
          }
          return {
            ...item,
            fullContent: renderCustomContent(item.excerpt, item.rawContent || item.excerpt),
          };
        });

        const idbIds = new Set(idbBlogs.map((b) => b.id));
        const missingInitial = INITIAL_BLOG_POSTS.filter((b) => !idbIds.has(b.id));

        const combined = [...mappedIdb, ...missingInitial];
        setBlogs(combined);
      }
    });
  }, []);

  // Listen to hash changes (e.g. #blog-sap-s4hana-implementation-timeline)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#blog-')) {
        const targetId = hash.replace('#blog-', '');
        const target = INITIAL_BLOG_POSTS.find((b) => b.id === targetId) || blogs.find((b) => b.id === targetId);
        if (target) {
          setSelectedBlog(target);
          if (modalScrollRef.current) {
            modalScrollRef.current.scrollTop = 0;
          }
        }
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [blogs]);

  // Native capture-phase listener to guarantee internal links intercept immediately
  useEffect(() => {
    const container = modalScrollRef.current;
    if (!container || !selectedBlog) return;

    const onNativeLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      if (!target) return;
      if ((target as any).nodeType === 3) {
        target = target.parentElement;
      }
      if (!target) return;

      const linkEl = target.closest('a') as HTMLAnchorElement | null;
      if (!linkEl) return;

      let targetBlogId = linkEl.getAttribute('data-blog-id');
      if (!targetBlogId) {
        const href = linkEl.getAttribute('href') || '';
        if (href.startsWith('#blog-')) {
          targetBlogId = href.replace('#blog-', '');
        } else {
          for (const b of INITIAL_BLOG_POSTS) {
            if (href.includes(b.id)) {
              targetBlogId = b.id;
              break;
            }
          }
        }
      }

      if (targetBlogId) {
        e.preventDefault();
        e.stopPropagation();
        const targetBlog = INITIAL_BLOG_POSTS.find((b) => b.id === targetBlogId) || blogs.find((b) => b.id === targetBlogId);
        if (targetBlog) {
          if (selectedBlog && selectedBlog.id !== targetBlog.id) {
            setBlogHistory((prev) => [...prev, selectedBlog]);
          }
          setSelectedBlog(targetBlog);
          try {
            window.location.hash = `blog-${targetBlogId}`;
          } catch (_) {}
          if (container) {
            container.scrollTop = 0;
          }
        }
        return;
      }

      const href = linkEl.getAttribute('href') || '';
      if (href === '#contact' || href.startsWith('#contact')) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedBlog(null);
        setBlogHistory([]);
        if (onNavigateContact) onNavigateContact();
      }
    };

    container.addEventListener('click', onNativeLinkClick, true);
    return () => {
      container.removeEventListener('click', onNativeLinkClick, true);
    };
  }, [selectedBlog, blogs, onNavigateContact]);

  const handleCloseModal = () => {
    setSelectedBlog(null);
    setBlogHistory([]);
    if (window.location.hash.startsWith('#blog-')) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (_) {}
    }
  };

  const handleBackToPreviousBlog = () => {
    if (blogHistory.length > 0) {
      const prevBlog = blogHistory[blogHistory.length - 1];
      setBlogHistory((prev) => prev.slice(0, prev.length - 1));
      setSelectedBlog(prevBlog);
      try {
        window.location.hash = `blog-${prevBlog.id}`;
      } catch (_) {}
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg)$/i) && !file.name.match(/\.(png|jpe?g)$/i)) {
      setFormError('Please upload an image in JPG or PNG format only.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setFormError('Image size should be under 20MB.');
      return;
    }

    setIsProcessingImage(true);
    setBannerFileName(file.name);
    setFormError('');

    try {
      const compressedDataUrl = await compressImageFile(file);
      setNewBannerImage(compressedDataUrl);
    } catch (err) {
      console.error('Image compression error:', err);
      setFormError('Could not process image file. Please try another JPG or PNG.');
      setNewBannerImage('');
      setBannerFileName('');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleEditImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg)$/i) && !file.name.match(/\.(png|jpe?g)$/i)) {
      setEditFormError('Please upload an image in JPG or PNG format only.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setEditFormError('Image size should be under 20MB.');
      return;
    }

    setIsProcessingEditImage(true);
    setEditBannerFileName(file.name);
    setEditFormError('');

    try {
      const compressedDataUrl = await compressImageFile(file);
      setEditBannerImage(compressedDataUrl);
    } catch (err) {
      console.error('Image compression error:', err);
      setEditFormError('Could not process image file. Please try another JPG or PNG.');
    } finally {
      setIsProcessingEditImage(false);
    }
  };

  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setFormError('Please upload a PDF document (.pdf format only).');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setFormError('PDF size should be under 30MB.');
      return;
    }

    setIsProcessingPdf(true);
    const formattedSize = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(0)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setPdfFileName(file.name);
    setPdfFileSize(formattedSize);
    setFormError('');

    // Extract text from the PDF file so the blog actually has rich content
    try {
      const extracted = await extractTextFromPdfFile(file);
      if (extracted.htmlContent) {
        setNewContent(extracted.htmlContent);
      }
      if (!newExcerpt.trim() && extracted.excerpt) {
        setNewExcerpt(extracted.excerpt);
      } else if (!newExcerpt.trim()) {
        setNewExcerpt(`Official publication: ${file.name}`);
      }
      if (!newTitle.trim() && extracted.suggestedTitle) {
        setNewTitle(extracted.suggestedTitle);
      }
    } catch (err) {
      console.warn('PDF text extraction note:', err);
      if (!newExcerpt.trim()) {
        setNewExcerpt(`Official publication: ${file.name}`);
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewPdfUrl(reader.result as string);
      setIsProcessingPdf(false);
    };
    reader.onerror = () => {
      setFormError('Failed to read the PDF file. Please try again.');
      setIsProcessingPdf(false);
    };
    reader.readAsDataURL(file);
  };

  const handleEditPdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setEditFormError('Please upload a PDF document (.pdf format only).');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setEditFormError('PDF size should be under 30MB.');
      return;
    }

    setIsProcessingEditPdf(true);
    const formattedSize = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(0)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setEditPdfFileName(file.name);
    setEditPdfFileSize(formattedSize);
    setEditFormError('');

    try {
      const extracted = await extractTextFromPdfFile(file);
      if (extracted.htmlContent && !editContent.trim()) {
        setEditContent(extracted.htmlContent);
      }
      if (!editExcerpt.trim() && extracted.excerpt) {
        setEditExcerpt(extracted.excerpt);
      } else if (!editExcerpt.trim()) {
        setEditExcerpt(`Official publication: ${file.name}`);
      }
    } catch (err) {
      console.warn('PDF extraction error in edit:', err);
      if (!editExcerpt.trim()) {
        setEditExcerpt(`Official publication: ${file.name}`);
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setEditPdfUrl(reader.result as string);
      setIsProcessingEditPdf(false);
    };
    reader.onerror = () => {
      setEditFormError('Failed to read the PDF file. Please try again.');
      setIsProcessingEditPdf(false);
    };
    reader.readAsDataURL(file);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: authUsername.trim(), password: authPassword }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.user?.role === 'audit') {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('clyptus_blog_auth', 'true');
        } catch {}
        setIsAuthModalOpen(false);
        setAuthPassword('');
        showToast('Authenticated as Audit. Blog management mode active.');
      } else if (res.ok && data.success && data.user?.role !== 'audit') {
        setAuthError('Access restricted: Author / Audit privileges required.');
      } else {
        setAuthError(data.error || 'Invalid credentials! Access denied.');
      }
    } catch {
      setAuthError('Authentication service unreachable. Please try again.');
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('clyptus_blog_auth');
    } catch {}
    showToast('Logged out of author session.');
  };

  const handleOpenCreateFlow = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      setAuthError('');
      setAuthUsername('Audit');
      setAuthPassword('');
      setIsAuthModalOpen(true);
    }
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Please enter a blog title.');
      return;
    }

    let finalExcerpt = newExcerpt.trim();
    if (!finalExcerpt) {
      if (pdfFileName) {
        finalExcerpt = `Official PDF Document: ${pdfFileName}`;
      } else {
        setFormError('Please enter a short excerpt or summary.');
        return;
      }
    }

    const hasManualContent = Boolean(
      newContent.trim() &&
      newContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0
    );

    if (!newBannerImage) {
      setFormError('Please upload a banner image in JPG or PNG format.');
      return;
    }

    const newPostId = `custom-blog-${Date.now()}`;
    let rawContentToUse = hasManualContent ? newContent.trim() : '';
    if (!rawContentToUse && newPdfUrl) {
      rawContentToUse = `<p>This official article is provided as a complete publication: <strong>${pdfFileName || 'Attached Document.pdf'}</strong>. You can view the full document in the interactive document viewer above, or download the original file directly.</p>`;
    }

    const rawPostData = {
      id: newPostId,
      title: newTitle.trim(),
      category: newCategory,
      categoryColor: getCategoryColor(newCategory),
      author: newAuthor.trim() || 'Audit',
      authorRole: newAuthorRole.trim() || 'Audit & Tech Lead',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      bannerImage: newBannerImage,
      excerpt: finalExcerpt,
      rawContent: rawContentToUse,
      isEdited: true,
      pdfUrl: newPdfUrl || undefined,
      pdfFileName: pdfFileName || undefined,
      pdfFileSize: pdfFileSize || undefined,
    };

    const newPost: BlogPost = {
      ...rawPostData,
      fullContent: renderCustomContent(rawPostData.excerpt, rawPostData.rawContent),
    };

    const updatedBlogs = [newPost, ...blogs];
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);

    // Reset Form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewBannerImage('');
    setBannerFileName('');
    setNewPdfUrl('');
    setPdfFileName('');
    setPdfFileSize('');
    setFormError('');
    setIsCreateModalOpen(false);

    // Automatic logout after creating the blog
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('clyptus_blog_auth');
    } catch {}

    showToast('🎉 New blog published successfully! Session logged out.');
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setEditTitle(blog.title);
    setEditCategory(blog.category);
    setEditAuthor(blog.author);
    setEditAuthorRole(blog.authorRole);
    setEditBannerImage(blog.bannerImage);
    setEditBannerFileName('');
    setEditExcerpt(blog.excerpt);
    setEditContent(blog.rawContent || blog.excerpt);
    setEditPdfUrl(blog.pdfUrl || '');
    setEditPdfFileName(blog.pdfFileName || '');
    setEditPdfFileSize(blog.pdfFileSize || '');
    setEditFormError('');
    setIsEditModalOpen(true);
  };

  const handleSaveEditBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      setEditFormError('Please enter a blog title.');
      return;
    }

    let finalExcerpt = editExcerpt.trim();
    if (!finalExcerpt) {
      if (editPdfFileName) {
        finalExcerpt = `Official PDF Document: ${editPdfFileName}`;
      } else {
        setEditFormError('Please enter a short excerpt or summary.');
        return;
      }
    }

    const hasManualContent = Boolean(
      editContent.trim() &&
      editContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0
    );

    if (!editBannerImage) {
      setEditFormError('Please upload or select a banner image.');
      return;
    }

    let rawContentToUse = hasManualContent ? editContent.trim() : '';
    if (!rawContentToUse && editPdfUrl) {
      rawContentToUse = `<p>This official article is provided as a complete publication: <strong>${editPdfFileName || 'Attached Document.pdf'}</strong>. You can view the full document in the interactive document viewer above, or download the original file directly.</p>`;
    }

    const updatedBlogs = blogs.map((b) => {
      if (b.id !== editingBlogId) return b;
      const updated: BlogPost = {
        ...b,
        title: editTitle.trim(),
        category: editCategory.trim() || b.category,
        categoryColor: getCategoryColor(editCategory.trim() || b.category),
        author: editAuthor.trim() || b.author,
        authorRole: editAuthorRole.trim() || b.authorRole,
        bannerImage: editBannerImage,
        excerpt: finalExcerpt,
        rawContent: rawContentToUse,
        fullContent: renderCustomContent(finalExcerpt, rawContentToUse),
        isEdited: true,
        pdfUrl: editPdfUrl || undefined,
        pdfFileName: editPdfFileName || undefined,
        pdfFileSize: editPdfFileSize || undefined,
      };
      return updated;
    });

    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);

    if (selectedBlog && selectedBlog.id === editingBlogId) {
      const refreshed = updatedBlogs.find((b) => b.id === editingBlogId);
      if (refreshed) setSelectedBlog(refreshed);
    }

    setIsEditModalOpen(false);
    setEditingBlogId(null);
    showToast('✨ Blog post updated successfully!');
  };

  const handleOpenDeleteConfirm = (blog: BlogPost) => {
    setBlogToDelete(blog);
  };

  const handleConfirmDelete = () => {
    if (!blogToDelete) return;
    const targetId = blogToDelete.id;
    const updatedBlogs = blogs.filter((b) => b.id !== targetId);
    setBlogs(updatedBlogs);
    saveBlogsToLocalStorage(updatedBlogs);

    if (selectedBlog && selectedBlog.id === targetId) {
      setSelectedBlog(null);
      setBlogHistory([]);
    } else {
      setBlogHistory((prev) => prev.filter((b) => b.id !== targetId));
    }
    setBlogToDelete(null);
    showToast('🗑️ Blog post removed successfully!');
  };

  const filteredPosts = blogs.filter((post) => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (selectedCategoryTab === 'All') return true;

    const cat = (post.category || '').toLowerCase();
    const title = (post.title || '').toLowerCase();

    const isFestival =
      cat.includes('festival') ||
      cat.includes('culture') ||
      cat.includes('celebrat') ||
      cat.includes('event') ||
      cat.includes('chavithi') ||
      title.includes('festival') ||
      title.includes('vinayaka') ||
      title.includes('diwali') ||
      title.includes('chavithi') ||
      title.includes('celebrat') ||
      title.includes('celebration');

    if (selectedCategoryTab === 'Festival') {
      return isFestival;
    }

    if (selectedCategoryTab === 'Technical') {
      return !isFestival;
    }

    return true;
  });

  const handleArticleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement | null;
    if (!target) return;
    if ((target as any).nodeType === 3) {
      target = target.parentElement;
    }
    if (!target) return;

    const linkEl = target.closest('a') as HTMLAnchorElement | null;
    if (!linkEl) return;

    // 1. Check if clicked element or its parent is an internal blog link
    let targetBlogId = linkEl.getAttribute('data-blog-id');
    if (!targetBlogId) {
      const href = linkEl.getAttribute('href') || '';
      if (href.startsWith('#blog-')) {
        targetBlogId = href.replace('#blog-', '');
      } else {
        for (const b of INITIAL_BLOG_POSTS) {
          if (href.includes(b.id)) {
            targetBlogId = b.id;
            break;
          }
        }
      }
    }

    if (targetBlogId) {
      e.preventDefault();
      e.stopPropagation();
      const targetBlog = INITIAL_BLOG_POSTS.find((b) => b.id === targetBlogId) || blogs.find((b) => b.id === targetBlogId);
      if (targetBlog) {
        if (selectedBlog && selectedBlog.id !== targetBlog.id) {
          setBlogHistory((prev) => [...prev, selectedBlog]);
        }
        setSelectedBlog(targetBlog);
        try {
          window.location.hash = `blog-${targetBlogId}`;
        } catch (_) {}
        if (modalScrollRef.current) {
          modalScrollRef.current.scrollTop = 0;
        }
      }
      return;
    }

    // 2. Check if clicked element is CTA button leading to contact
    const href = linkEl.getAttribute('href') || '';
    if (href === '#contact' || href.startsWith('#contact')) {
      e.preventDefault();
      e.stopPropagation();
      setSelectedBlog(null);
      setBlogHistory([]);
      if (onNavigateContact) onNavigateContact();
    }
  };

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/20 selection:text-sky-800 min-h-screen pb-20">

      {/* ---------------------------------------------------- */}
      {/* HERO HEADER                                          */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full pt-14 pb-14 sm:pt-20 sm:pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/80 text-slate-900 select-none">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center">


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 mb-6 max-w-4xl">
            Insights, Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Company Culture</span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-600 max-w-3xl leading-relaxed mb-8">
            Explore our latest stories, event highlights, tech insights, and workplace culture updates at Clyptus Software Solutions.
          </p>

          {/* Action Row: Search Bar & Create Blog */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search blog stories, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/90 border border-slate-300 rounded-full text-sm font-medium text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
              />
            </div>

            <button
              onClick={handleOpenCreateFlow}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {isAuthenticated ? (
                <>
                  <PenTool className="w-4 h-4" />
                  <span>Create New Blog</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Manage / Create Blogs</span>
                </>
              )}
            </button>
          </div>

          {/* Category Filter Buttons: All, Technical, Festival */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            {(['All', 'Technical', 'Festival'] as const).map((tab) => {
              const isActive = selectedCategoryTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedCategoryTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>



          {/* Auth status bar if logged in */}
          {isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Signed in as <strong className="font-bold">Audit</strong> • Management Mode Active</span>
              <button
                onClick={handleLogout}
                className="ml-2 text-[11px] font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 hover:underline transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3 h-3" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* BLOG CARDS GRID SECTION                               */}
      {/* ---------------------------------------------------- */}
      <main className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedBlog(post);
                setBlogHistory([]);
              }}
              className="group relative cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Image Banner */}
              <div className="relative w-full h-52 overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={post.bannerImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.pdfUrl && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold shadow-xs">
                      <FileText className="w-3 h-3 text-rose-400" />
                      <span>PDF Document</span>
                    </span>
                  </div>
                )}

                {/* Management Action Buttons when Logged In */}
                {isAuthenticated && (
                  <div 
                    className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(post);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-600 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Edit Title, Image, Text"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteConfirm(post);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Remove Blog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta Details */}
                  <div className="flex items-center gap-2.5 flex-wrap text-xs font-sans text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {post.date}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-sans font-bold uppercase tracking-wider shadow-2xs ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* PREVIEW EXCERPT - STRICTLY DISPLAY 4 LINES OF TEXT */}
                  <p
                    className="text-sm text-slate-600 font-medium leading-relaxed mb-6"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Meta & Open Card Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sky-700 font-bold text-xs">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{post.author}</p>
                      <p className="text-xs text-slate-500 font-medium font-sans leading-tight mt-0.5">{post.authorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlog(post);
                      setBlogHistory([]);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-600 group-hover:text-sky-700 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg font-semibold mb-2">
              {searchQuery ? `No blog posts found matching "${searchQuery}"` : `No blog posts found under "${selectedCategoryTab}"`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryTab('All');
              }}
              className="px-5 py-2 rounded-full bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* FULL MATTER ARTICLE READER MODAL                     */}
      {/* ---------------------------------------------------- */}
      {selectedBlog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-200 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {blogHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleBackToPreviousBlog}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                    title={`Back to: ${blogHistory[blogHistory.length - 1].title}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-sky-600" />
                    <span>Back</span>
                  </button>
                )}
                <span className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase ${selectedBlog.categoryColor}`}>
                  {selectedBlog.category}
                </span>
                <span className="text-xs text-slate-400 font-sans hidden sm:inline">•</span>
                <span className="text-xs text-slate-500 font-sans font-medium hidden sm:inline">{selectedBlog.date}</span>
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(selectedBlog)}
                      className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Edit Blog"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenDeleteConfirm(selectedBlog)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Remove Blog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </>
                )}
                <button
                  onClick={handleCloseModal}
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Article Content ("The Whole Matter") */}
            <div 
              ref={modalScrollRef} 
              key={`modal-body-${selectedBlog.id}`}
              className="p-6 sm:p-10 overflow-y-auto space-y-8"
              onClick={handleArticleContentClick}
            >
              {/* Back to Previous Blog Banner when navigated via internal link */}
              {blogHistory.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50/50 to-slate-50 border border-sky-200/90 text-sky-950 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={handleBackToPreviousBlog}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-700 hover:text-sky-900 border border-sky-300 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs group shrink-0 active:scale-95"
                    >
                      <ArrowLeft className="w-4 h-4 text-sky-600 group-hover:-translate-x-1 transition-transform" />
                      <span>Back to Previous Blog</span>
                    </button>
                    <span className="text-xs text-slate-600 truncate">
                      From: <span className="font-semibold text-slate-800">"{blogHistory[blogHistory.length - 1].title}"</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-700 bg-sky-100/70 border border-sky-200 px-2.5 py-0.5 rounded-full hidden md:inline font-semibold shrink-0 self-start sm:self-auto">
                    {blogHistory.length} {blogHistory.length === 1 ? 'previous blog' : 'previous blogs'}
                  </span>
                </div>
              )}

              {/* Article Header */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {selectedBlog.title}
                </h1>

                {/* Author Info Bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-slate-600 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                  <span className="flex items-center gap-1.5 text-sky-700 font-bold">
                    <UserCheck className="w-4 h-4" />
                    By {selectedBlog.author} <span className="text-slate-500 font-normal">({selectedBlog.authorRole})</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Calendar className="w-4 h-4" />
                    {selectedBlog.date}
                  </span>
                </div>
              </div>

              {/* Attached PDF Document Viewer & Download Card */}
              {selectedBlog.pdfUrl && (
                <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                            PDF Document
                          </span>
                          {selectedBlog.pdfFileSize && (
                            <span className="text-xs font-mono text-slate-400">
                              {selectedBlog.pdfFileSize}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-sm sm:max-w-md">
                          {selectedBlog.pdfFileName || 'Attached Official Document'}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                      <a
                        href={pdfViewerBlobUrl || getPdfBlobUrl(selectedBlog.pdfUrl)}
                        download={selectedBlog.pdfFileName || `${selectedBlog.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                      <a
                        href={pdfViewerBlobUrl || getPdfBlobUrl(selectedBlog.pdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                        <span>Open in New Tab</span>
                      </a>
                    </div>
                  </div>

                  {/* Embedded PDF iframe with Blob URL */}
                  <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                    <iframe
                      src={`${pdfViewerBlobUrl || getPdfBlobUrl(selectedBlog.pdfUrl)}#toolbar=1`}
                      title={selectedBlog.pdfFileName || 'PDF Document'}
                      className="w-full h-[540px] rounded-2xl bg-slate-100"
                    />
                  </div>
                </div>
              )}

              {/* Full Article Content */}
              <div 
                key={`full-content-${selectedBlog.id}`}
                className="w-full max-w-none" 
                onClick={handleArticleContentClick}
              >
                {renderCustomContent(selectedBlog.excerpt, selectedBlog.rawContent || selectedBlog.excerpt)}
              </div>

              {/* Author Footer Section */}
              <div className="mt-12 pt-8 border-t border-slate-200 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl">
                <div>
                  <span className="text-xs font-mono font-extrabold text-sky-600 uppercase tracking-widest block mb-1">
                    ABOUT THE AUTHOR
                  </span>
                  <h4 className="text-xl font-black text-slate-900 mb-0.5">
                    Written by {selectedBlog.author}
                  </h4>
                  <p className="text-xs font-sans text-slate-600 font-semibold mb-2">
                    {selectedBlog.authorRole} at Clyptus Software Solutions
                  </p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                    Deepak manages recruitment operations, talent acquisition, and employee engagement initiatives at Clyptus Software Solutions.
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleCloseModal();
                    if (onNavigateContact) onNavigateContact();
                  }}
                  className="group shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span>Connect with HR Team →</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {blogHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleBackToPreviousBlog}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-300 hover:border-sky-300 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-sky-600" />
                    <span>Back to Previous Blog</span>
                  </button>
                )}
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Clyptus Blog Perspective
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* AUTHENTICATION MODAL (CLYPTUS BRAND CORPORATE THEME)  */}
      {/* ---------------------------------------------------- */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111A2E]/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Ambient Radial Glows */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#0089D7]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#111A2E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => {
                setIsAuthModalOpen(false);
                setAuthError('');
                setAuthUsername('');
                setAuthPassword('');
                setShowAuthPassword(false);
              }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#111A2E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Content */}
            <div className="relative pt-8 px-8 pb-3 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#0089D7] to-[#111A2E] text-white flex items-center justify-center shadow-lg shadow-[#0089D7]/20 mb-4">
                <Lock className="w-8 h-8 stroke-[2.2]" />
              </div>
              <span className="text-xs font-mono font-extrabold text-[#0089D7] uppercase tracking-widest block mb-1">
                PROTECTED AUTHOR PORTAL
              </span>
              <h3 className="text-2xl font-black text-[#111A2E] tracking-tight">
                Author Authentication
              </h3>
              <p className="text-xs text-[#111A2E]/70 font-medium mt-1.5">
                Enter your authorized credentials to create and publish a new blog post.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="p-8 pt-3 space-y-4">
              {authError && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111A2E] mb-1.5">
                  User Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-[#111A2E] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0089D7]/50 focus:border-[#0089D7] transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111A2E] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showAuthPassword ? 'text' : 'password'}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-[#111A2E] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0089D7]/50 focus:border-[#0089D7] transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowAuthPassword(!showAuthPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#111A2E] transition-colors cursor-pointer"
                    title={showAuthPassword ? 'Hide password' : 'Show password'}
                  >
                    {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setAuthError('');
                    setAuthUsername('');
                    setAuthPassword('');
                    setShowAuthPassword(false);
                  }}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAuthSubmitting}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0089D7] hover:bg-[#0077be] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isAuthSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Authenticate &amp; Continue</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security Notice */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Secure 256-Bit Encrypted Author Access
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CREATE BLOG MODAL                                    */}
      {/* ---------------------------------------------------- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    Create New Blog Post
                  </h3>
                  <p className="text-xs text-slate-400">
                    Publish insights or company updates to Clyptus Blog
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreateBlog} className="p-6 overflow-y-auto space-y-5 flex-1">
              {formError && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Scaling SAP Workloads with Cloud Architecture in 2026"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    'Clyptus Culture Story',
                    'ERP & SAP',
                    'Talent Acquisition',
                    'AI & Generative AI',
                    'SAP Insights & Tech',
                    'IT Recruitment',
                    'Enterprise & AI',
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                        newCategory === cat
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Custom Category"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Author and Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Audit"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={newAuthorRole}
                    onChange={(e) => setNewAuthorRole(e.target.value)}
                    placeholder="Audit & Tech Lead"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Upload Banner Image (JPG / PNG only, no URL option) */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Banner Image (JPG or PNG) <span className="text-rose-500">*</span>
                </label>
                
                {isProcessingImage ? (
                  <div className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-sky-400 bg-sky-50/50 rounded-2xl">
                    <Loader2 className="w-6 h-6 text-sky-600 animate-spin mb-2" />
                    <p className="text-xs font-bold text-sky-700">Compressing & optimizing image...</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{bannerFileName}</p>
                  </div>
                ) : newBannerImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img 
                      src={newBannerImage} 
                      alt="Uploaded Banner Preview" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold cursor-pointer hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-sky-600" />
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setNewBannerImage('');
                          setBannerFileName('');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                    {bannerFileName && (
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/70 text-white text-[11px] font-mono truncate max-w-[85%]">
                        {bannerFileName}
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 px-4 border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50/80 hover:bg-sky-50/30 rounded-2xl cursor-pointer transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 group-hover:bg-sky-200 text-sky-600 flex items-center justify-center mb-2 transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-sky-700">
                        Click to upload Banner Image
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        JPG or PNG files only (Max 20MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Direct PDF Document Upload (Skip manual content or attach doc) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                    Direct PDF Document Upload
                  </label>
                  <span className="text-[11px] text-sky-600 font-medium">
                    {newPdfUrl ? 'PDF attached • Manual writing is optional' : 'Upload PDF directly to skip manual typing'}
                  </span>
                </div>

                {isProcessingPdf ? (
                  <div className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-sky-400 bg-sky-50/50 rounded-2xl">
                    <Loader2 className="w-6 h-6 text-sky-600 animate-spin mb-1.5" />
                    <p className="text-xs font-bold text-sky-700">Reading & attaching PDF document...</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{pdfFileName}</p>
                  </div>
                ) : newPdfUrl ? (
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-rose-200 bg-rose-50/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                            {pdfFileName || 'Attached Document.pdf'}
                          </p>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0 flex items-center gap-1">
                            <FileCheck className="w-3 h-3 text-emerald-600" /> Ready
                          </span>
                        </div>
                        {pdfFileSize && (
                          <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                            {pdfFileSize} • Official Document Attached
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const url = getPdfBlobUrl(newPdfUrl);
                          window.open(url, '_blank');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewPdfUrl('');
                          setPdfFileName('');
                          setPdfFileSize('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-28 px-4 border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50/80 hover:bg-sky-50/30 rounded-2xl cursor-pointer transition-all group">
                    <div className="flex flex-col items-center justify-center py-2.5 text-center">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 group-hover:bg-rose-100 text-rose-600 flex items-center justify-center mb-1.5 transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-sky-700">
                        Click to upload PDF directly (Skip manual writing)
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        .pdf files only • Up to 30MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Excerpt / Summary {newPdfUrl ? <span className="text-[11px] font-sans font-normal text-slate-500">(Auto-filled from PDF if left empty)</span> : <span className="text-rose-500">*</span>}
                </label>
                <textarea
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder={newPdfUrl ? `Summary for ${pdfFileName || 'PDF Document'}...` : "A concise 1-2 sentence overview of the blog story..."}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all resize-none"
                />
              </div>

              {/* Full Content with Rich Text Editing Options */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                    Full Article Content <span className="text-[11px] font-sans font-normal text-slate-400">(Optional)</span>
                  </label>
                </div>
                <RichTextEditor
                  value={newContent}
                  onChange={setNewContent}
                  placeholder={newPdfUrl ? "Optional: Write any introductory or accompanying notes for the uploaded PDF..." : "Write your blog article story here... Highlight any text to customize font, size, color, bold, lists, and headings."}
                  minHeight="240px"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md hover:shadow-sky-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Optimizing Image...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Blog Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* EDIT BLOG MODAL                                      */}
      {/* ---------------------------------------------------- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    Edit Blog Post
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modify the title, banner image, excerpt, or article text
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingBlogId(null);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveEditBlog} className="p-6 overflow-y-auto space-y-5 flex-1">
              {editFormError && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{editFormError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Blog Title"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    'Clyptus Culture Story',
                    'ERP & SAP',
                    'Talent Acquisition',
                    'AI & Generative AI',
                    'SAP Insights & Tech',
                    'IT Recruitment',
                    'Enterprise & AI',
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setEditCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                        editCategory === cat
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Custom Category"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Author and Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    placeholder="Author Name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={editAuthorRole}
                    onChange={(e) => setEditAuthorRole(e.target.value)}
                    placeholder="Author Role"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Banner Image Upload */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Banner Image (JPG or PNG) <span className="text-rose-500">*</span>
                </label>
                
                {isProcessingEditImage ? (
                  <div className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-sky-400 bg-sky-50/50 rounded-2xl">
                    <Loader2 className="w-6 h-6 text-sky-600 animate-spin mb-2" />
                    <p className="text-xs font-bold text-sky-700">Compressing & optimizing image...</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{editBannerFileName}</p>
                  </div>
                ) : editBannerImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img 
                      src={editBannerImage} 
                      alt="Banner Preview" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold cursor-pointer hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-sky-600" />
                        <span>Upload New Image</span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                          onChange={handleEditImageFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {editBannerFileName && (
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/70 text-white text-[11px] font-mono truncate max-w-[85%]">
                        {editBannerFileName}
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 px-4 border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50/80 hover:bg-sky-50/30 rounded-2xl cursor-pointer transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 group-hover:bg-sky-200 text-sky-600 flex items-center justify-center mb-2 transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-sky-700">
                        Click to upload new Banner Image
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        JPG or PNG files only (Max 20MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleEditImageFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Direct PDF Document Upload (Edit / Replace / Remove) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                    Direct PDF Document Upload
                  </label>
                  <span className="text-[11px] text-sky-600 font-medium">
                    {editPdfUrl ? 'PDF attached • Manual writing is optional' : 'Upload or replace PDF document'}
                  </span>
                </div>

                {isProcessingEditPdf ? (
                  <div className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-sky-400 bg-sky-50/50 rounded-2xl">
                    <Loader2 className="w-6 h-6 text-sky-600 animate-spin mb-1.5" />
                    <p className="text-xs font-bold text-sky-700">Reading & updating PDF document...</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{editPdfFileName}</p>
                  </div>
                ) : editPdfUrl ? (
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-rose-200 bg-rose-50/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                            {editPdfFileName || 'Attached Document.pdf'}
                          </p>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0 flex items-center gap-1">
                            <FileCheck className="w-3 h-3 text-emerald-600" /> Attached
                          </span>
                        </div>
                        {editPdfFileSize && (
                          <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                            {editPdfFileSize} • Official Document Attached
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const url = getPdfBlobUrl(editPdfUrl);
                          window.open(url, '_blank');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditPdfUrl('');
                          setEditPdfFileName('');
                          setEditPdfFileSize('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-28 px-4 border-2 border-dashed border-slate-300 hover:border-sky-500 bg-slate-50/80 hover:bg-sky-50/30 rounded-2xl cursor-pointer transition-all group">
                    <div className="flex flex-col items-center justify-center py-2.5 text-center">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 group-hover:bg-rose-100 text-rose-600 flex items-center justify-center mb-1.5 transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-sky-700">
                        Upload or Replace PDF Document
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        .pdf files only • Up to 30MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleEditPdfFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Excerpt / Summary {editPdfUrl ? <span className="text-[11px] font-sans font-normal text-slate-500">(Auto-filled from PDF if empty)</span> : <span className="text-rose-500">*</span>}
                </label>
                <textarea
                  rows={2}
                  value={editExcerpt}
                  onChange={(e) => setEditExcerpt(e.target.value)}
                  placeholder={editPdfUrl ? `Summary for ${editPdfFileName || 'PDF'}...` : "Summary..."}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all resize-none"
                />
              </div>

              {/* Full Content with Rich Text Editing Options */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                    Full Article Content <span className="text-[11px] font-sans font-normal text-slate-400">(Optional)</span>
                  </label>
                </div>
                <RichTextEditor
                  value={editContent}
                  onChange={setEditContent}
                  placeholder={editPdfUrl ? "Optional: Notes or summary accompanying the PDF..." : "Edit your blog article content here... Select text to adjust font, size, color, bold, lists, and headings."}
                  minHeight="240px"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingBlogId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingEditImage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md hover:shadow-sky-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessingEditImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Optimizing Image...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* REMOVE / DELETE CONFIRMATION MODAL                   */}
      {/* ---------------------------------------------------- */}
      {blogToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
                <Trash2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Remove Blog Post?
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                Are you sure you want to remove:
              </p>
              <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-200 line-clamp-2 mb-4">
                "{blogToDelete.title}"
              </p>
              <p className="text-xs text-rose-600 font-medium">
                This action will delete the blog post from the website.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setBlogToDelete(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md hover:shadow-rose-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Yes, Remove Blog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default BlogsPage;

