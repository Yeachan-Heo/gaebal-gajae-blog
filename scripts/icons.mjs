const ICON_PATHS = {
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  chevronUp: '<path d="M18 15l-6-6-6 6"/>',
  check: '<path d="M5 12.5l4.25 4.25L19 7"/>',
};

export function renderIcon(name, { className = '', size = 16, strokeWidth = 2, ariaHidden = true } = {}) {
  const path = ICON_PATHS[name];
  if (!path) throw new Error(`Unknown icon: ${name}`);
  const classAttr = ['ui-icon', className].filter(Boolean).join(' ');
  const ariaAttr = ariaHidden ? ' aria-hidden="true" focusable="false"' : '';
  return `<svg class="${classAttr}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${ariaAttr}>${path}</svg>`;
}
