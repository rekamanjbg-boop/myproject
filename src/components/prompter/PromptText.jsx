export function PromptText({ cue, fontScale, scrollProgress }) {
  return (
    <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center justify-center overflow-hidden px-5 text-center">
      <p
        className="font-semibold leading-tight text-white transition-transform duration-300"
        style={{
          fontSize: `clamp(3.5rem, ${7.6 * fontScale}vw, ${8.8 * fontScale}rem)`,
          transform: `translateY(-${scrollProgress * 0.42}px)`,
          textWrap: 'balance',
        }}
      >
        {cue?.actorPrompt || 'Stand by for actor prompt.'}
      </p>
    </div>
  );
}
