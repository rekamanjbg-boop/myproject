export function FloatingControls({ children }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-theater-line bg-black/60 p-2 shadow-panel backdrop-blur-xl">
      {children}
    </div>
  );
}
