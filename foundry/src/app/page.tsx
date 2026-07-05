import { DataTable, PreviewCard, Section, SwatchCard } from '@/components/foundry';
import { contractRows, previewCards, swatches, variantRows } from '@/lib/foundry-data';

export default function Page() {
  return (
    <main className="wrap space-y-14 py-12 md:space-y-20 md:py-16">
      <section className="hero hero-compact preview-hero space-y-6">
        <div className="badge ui-badge status-stamp status-stamp-lane">STYLE FOUNDRY WORKBENCH · Next.js + Tailwind + TypeScript</div>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-[var(--ink-strong)] md:text-7xl">가재 블로그 디자인 시스템 워크벤치</h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--ink-soft)]">새로고침 지옥 대신 Next.js + Tailwind + TypeScript 환경에서 base component, variant, modifier 계약부터 먼저 굳힙니다.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="button button-link button-primary" href="#contract">구조 보기</a>
          <a className="button button-link button-secondary" href="#card-system">카드 보기</a>
        </div>
      </section>

      <Section id="tokens" title="Color palette" description="paper는 기본 면, graphite는 증거 면, lobster/verified/warning은 역할이 있을 때만 올라옵니다.">
        <div className="grid gap-4 md:grid-cols-2">
          {swatches.map((swatch) => (
            <SwatchCard key={swatch.token} token={swatch.token} description={swatch.description} />
          ))}
        </div>
      </Section>

      <Section id="contract" title="Component contract" description="Tailwind/CVA처럼 base component + variant + modifier 계약으로 세우고, 콘텐츠 레인 이름은 컴포넌트 이름으로 올리지 않습니다.">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <article className="card card-variant-default component-map-card p-4">
            <p className="preview-type-label">핵심 원칙</p>
            <h3 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">Card는 하나고, 역할 차이는 variant로 푼다</h3>
            <ol className="component-step-list">
              <li><strong>Base</strong><span><b>Card</b> 하나를 기본 읽기 표면으로 둔다.</span></li>
              <li><strong>Variant</strong><span><b>default / lead / tip / evidence / report / reference</b>로 읽히는 역할만 나눈다.</span></li>
              <li><strong>Modifier</strong><span><b>featured / compact / with-rail / with-corner</b>처럼 필요한 차이만 얹는다.</span></li>
              <li><strong>Taxonomy</strong><span><b>Daily Reflection / Setup Tip</b>은 콘텐츠 레인이지 컴포넌트 이름이 아니다.</span></li>
            </ol>
          </article>
          <article className="card card-variant-default component-ledger-card p-4">
            <p className="preview-type-label">계약표</p>
            <h3 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">이름은 레이어마다 다르게 쓴다</h3>
            <DataTable headers={['레이어', '정식 이름', '이유']} rows={contractRows} />
          </article>
        </div>
      </Section>

      <Section id="card-system" title="Card system" description="여기서 보여주는 건 카드 종류 자랑이 아니라, 하나의 Card를 어디까지 변형해도 되는지에 대한 최소 계약입니다.">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <article className="card card-variant-default component-map-card p-4">
            <p className="preview-type-label">슬롯</p>
            <h3 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">모든 variant가 가능한 한 공유해야 하는 구조</h3>
            <ol className="component-step-list">
              <li><strong>Eyebrow</strong><span>작은 메타 또는 레인 표시.</span></li>
              <li><strong>Title</strong><span>제일 먼저 읽히는 핵심 텍스트.</span></li>
              <li><strong>Body</strong><span>짧은 요약 또는 본문 도입.</span></li>
              <li><strong>Meta / footer</strong><span>상태, 날짜, 링크 같은 부속 정보.</span></li>
              <li><strong>Optional rail</strong><span>verified / warning 같은 기능성 강조만 허용.</span></li>
            </ol>
          </article>
          <article className="card card-variant-default component-ledger-card p-4">
            <p className="preview-type-label">Variant 표</p>
            <h3 className="text-3xl font-black tracking-tight text-[var(--ink-strong)]">Card에서 여기까지만 분기한다</h3>
            <DataTable headers={['variant', '언제', '읽히는 방식']} rows={variantRows} />
          </article>
        </div>
        <div className="component-dont-strip mt-4">
          <strong>하지 말 것</strong>
          <span>레인마다 새 카드 이름 만들지 않기 · 모든 변화를 별도 컴포넌트로 승격하지 않기 · dark slab를 장식처럼 남발하지 않기</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-5">
          {previewCards.map((card) => (
            <PreviewCard key={card.label} card={card} />
          ))}
        </div>
      </Section>
    </main>
  );
}
