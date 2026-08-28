import sharp from 'sharp';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function wrapText(
  text: string,
  maxCharsPerLine: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length >= maxLines - 1) {
        break;
      }
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  const totalWordsIncluded = lines
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  if (totalWordsIncluded < words.length && lines.length > 0) {
    const lastIdx = lines.length - 1;
    lines[lastIdx] = lines[lastIdx].replace(/[.,;:!?\s]+$/, '') + '...';
  }

  return lines;
}

export async function generateOgImage(
  title: string,
  description: string
): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  const titleLines = wrapText(title, 30, 3);
  const descriptionLines = wrapText(description, 56, 3);

  const titleStartY = 200;
  const titleLineHeight = 64;
  const titleBlockHeight = (titleLines.length - 1) * titleLineHeight;

  const descStartY = titleStartY + titleBlockHeight + 60;
  const descLineHeight = 42;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="90" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const descTspans = descriptionLines
    .map(
      (line, i) =>
        `<tspan x="90" dy="${i === 0 ? 0 : descLineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#ffffff" />
      
      <!-- Top Accent Line -->
      <rect x="90" y="80" width="48" height="4" rx="2" fill="#18181b" />
      
      <!-- Title -->
      <text x="90" y="${titleStartY}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="700" fill="#09090b" letter-spacing="-0.02em">
        ${titleTspans}
      </text>
      
      <!-- Description -->
      <text x="90" y="${descStartY}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="400" fill="#71717a" letter-spacing="-0.01em">
        ${descTspans}
      </text>
      
      <!-- Bottom Site Label -->
      <text x="90" y="555" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="500" fill="#a1a1aa">
        stuffcheck.vercel.app
      </text>
    </svg>
  `;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
