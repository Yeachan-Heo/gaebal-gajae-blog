export function renderActionLink({ href, label, i18nKey = '', className = 'section-link ui-link-inline' }) {
  const i18nAttr = i18nKey ? ` data-i18n="${i18nKey}"` : '';
  return `<a class="${className}" href="${href}"${i18nAttr}>${label}</a>`;
}

export function renderBadge({ content, className = 'badge ui-badge' }) {
  return `<div class="${className}">${content}</div>`;
}

export function renderEyebrowTrail(items, { className = 'eyebrow ui-eyebrow' } = {}) {
  const html = items.map((item) => {
    if (item.href) {
      const i18nAttr = item.i18nKey ? ` data-i18n="${item.i18nKey}"` : '';
      return `<a href="${item.href}"${i18nAttr}>${item.label}</a>`;
    }
    return item.label;
  }).join('<span class="ui-eyebrow-separator" aria-hidden="true">·</span>');
  return `<p class="${className}">${html}</p>`;
}

export function renderMetaLine(parts, {
  className = 'reading-meta ui-meta',
  dateTag = 'span',
  textTag = 'span',
  separatorTag = 'span',
  separatorContent = '·',
} = {}) {
  if (!parts.length) return '';
  const [date, ...rest] = parts;
  const items = [`<${dateTag} class="meta-date">${date}</${dateTag}>`];
  for (const part of rest) {
    if (separatorContent) {
      items.push(`<${separatorTag} class="meta-separator" aria-hidden="true">${separatorContent}</${separatorTag}>`);
    }
    items.push(`<${textTag} class="meta-text">${part}</${textTag}>`);
  }
  return `<div class="${className}">${items.join('')}</div>`;
}

export function renderPostNavLink({ href, kicker, title, alignRight = false }) {
  return `<a class="post-nav-link ui-nav-link${alignRight ? ' align-right' : ''}" href="${href}"><span>${kicker}</span><strong>${title}</strong></a>`;
}
