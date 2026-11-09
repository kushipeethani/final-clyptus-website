import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Initialize PDF.js worker using Vite's ?url asset loader
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
} catch (e) {
  console.warn('PDF.js worker initialization warning:', e);
}

export interface ExtractedPdfData {
  text: string;
  htmlContent: string;
  excerpt: string;
  suggestedTitle: string;
  pageCount: number;
}

/**
 * Extracts all readable text from an uploaded PDF File and converts it into
 * clean, structured HTML paragraphs suitable for the rich text editor.
 */
export async function extractTextFromPdfFile(file: File): Promise<ExtractedPdfData> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const rawParagraphs: string[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const items = textContent.items as Array<{ str: string; hasEOL?: boolean }>;

    let currentLine = '';
    const pageLines: string[] = [];

    for (const item of items) {
      if ('str' in item) {
        currentLine += item.str;
        if (item.hasEOL) {
          if (currentLine.trim()) {
            pageLines.push(currentLine.trim());
          }
          currentLine = '';
        } else {
          currentLine += ' ';
        }
      }
    }
    if (currentLine.trim()) {
      pageLines.push(currentLine.trim());
    }

    // Group lines into paragraphs
    let paragraphAcc: string[] = [];
    for (const line of pageLines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (paragraphAcc.length > 0) {
          rawParagraphs.push(paragraphAcc.join(' '));
          paragraphAcc = [];
        }
      } else {
        paragraphAcc.push(trimmed);
      }
    }
    if (paragraphAcc.length > 0) {
      rawParagraphs.push(paragraphAcc.join(' '));
    }
  }

  // Filter and clean paragraphs
  const cleanedParagraphs = rawParagraphs
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 2);

  // Suggested title: first non-empty paragraph or heading (capped at 120 chars)
  let suggestedTitle = '';
  if (cleanedParagraphs.length > 0) {
    const firstP = cleanedParagraphs[0];
    suggestedTitle = firstP.length > 100 ? firstP.slice(0, 97) + '...' : firstP;
  }

  // Clean HTML conversion
  const htmlBlocks: string[] = [];
  for (let i = 0; i < cleanedParagraphs.length; i++) {
    const para = cleanedParagraphs[i];
    // If it looks like a sub-heading (short, no period, or uppercase)
    if (para.length < 75 && !para.endsWith('.') && (i > 0 || cleanedParagraphs.length > 1)) {
      htmlBlocks.push(`<h3><strong>${escapeHtml(para)}</strong></h3>`);
    } else {
      htmlBlocks.push(`<p>${escapeHtml(para)}</p>`);
    }
  }

  const htmlContent = htmlBlocks.join('\n');
  const fullText = cleanedParagraphs.join('\n\n');

  // Suggested Excerpt: First substantial paragraph (150-250 chars)
  let excerpt = '';
  if (cleanedParagraphs.length > 1) {
    excerpt = cleanedParagraphs[1].length > 220 
      ? cleanedParagraphs[1].slice(0, 217) + '...' 
      : cleanedParagraphs[1];
  } else if (cleanedParagraphs.length === 1) {
    excerpt = cleanedParagraphs[0].length > 220 
      ? cleanedParagraphs[0].slice(0, 217) + '...' 
      : cleanedParagraphs[0];
  }

  return {
    text: fullText,
    htmlContent,
    excerpt,
    suggestedTitle,
    pageCount: numPages,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Converts a base64 data URL (e.g. data:application/pdf;base64,...)
 * into a Blob URL (blob:http://...) so modern browsers can display it
 * inside iframes and open it in new tabs without security blocks.
 */
export function getPdfBlobUrl(pdfUrlOrData: string): string {
  if (!pdfUrlOrData) return '';
  if (pdfUrlOrData.startsWith('data:application/pdf;base64,')) {
    try {
      const base64 = pdfUrlOrData.split(',')[1];
      const binary = atob(base64);
      const len = binary.length;
      const buffer = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.warn('Failed to convert base64 PDF to blob URL:', e);
      return pdfUrlOrData;
    }
  }
  return pdfUrlOrData;
}
