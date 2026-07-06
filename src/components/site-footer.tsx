import { LocalizedText } from '@/components/ui/text';
type LangMap = Record<string, string>;
type UiMap = Record<string, LangMap>;

type SiteFooterProps = {
  ui: UiMap;
};

export function SiteFooter({ ui }: SiteFooterProps) {
  return (
    <footer className="wrap site-footer">
      <LocalizedText as="span" map={ui.built} />
      <div className="footer-links">
        <a href="/archive" data-i18n="footerArchive">
          <LocalizedText map={ui.footerArchive} />
        </a>
        <a href="/projects/" data-i18n="footerProjects">
          <LocalizedText map={ui.footerProjects} />
        </a>
        <a href="/rss.xml" data-i18n="footerFeed">
          <LocalizedText map={ui.footerFeed} />
        </a>
      </div>
    </footer>
  );
}
