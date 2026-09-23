export type FilterMode = 'normal' | 'clahe' | 'denoise' | 'high_contrast' | 'binarize';

export async function applyCVFilter(
  imgElement: HTMLImageElement,
  mode: FilterMode
): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return imgElement.src;

  canvas.width = imgElement.naturalWidth || imgElement.width || 600;
  canvas.height = imgElement.naturalHeight || imgElement.height || 780;

  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  if (mode === 'normal') {
    return canvas.toDataURL('image/jpeg', 0.92);
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const totalPixels = canvas.width * canvas.height;

  switch (mode) {
    case 'clahe': {
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const stretched = Math.min(255, Math.max(0, (gray - 128) * 1.5 + 128));
        data[i] = stretched;
        data[i + 1] = stretched;
        data[i + 2] = stretched;
      }
      break;
    }
    case 'denoise': {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg > 110 ? Math.min(255, avg * 1.1) : Math.max(0, avg * 0.9);
        data[i + 1] = data[i];
        data[i + 2] = data[i];
      }
      break;
    }
    case 'high_contrast': {
      const factor = (259 * (128 + 255)) / (255 * (259 - 128));
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
      }
      break;
    }
    case 'binarize': {
      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const mean = sum / totalPixels;
      const threshold = mean * 0.95;

      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const val = lum >= threshold ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      break;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.92);
}
