export function ScreenContainer({ eyebrow, title, description, action, children, size = 'wide' }) {
  const maxWidth = {
    narrow: 'max-w-4xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }[size];

  return (
    <section className={`mx-auto w-full ${maxWidth} px-4 py-6 sm:px-6 lg:px-8 lg:py-8`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-200/60">{eyebrow}</p>}
          {title && <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>}
          {description && <p className="mt-3 max-w-3xl text-base leading-7 text-violet-100/65">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
