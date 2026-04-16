export default function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grid-overlay"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="layout-frame"
        style={{
          height: "100%",
          position: "relative",
        }}
      >
        <div
          data-grid-overlay="rows"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255, 0, 0, 0.2) 0, rgba(255, 0, 0, 0.2) 0.0625rem, transparent 0.0625rem, transparent 1.5rem)",
          }}
        />
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            data-grid-overlay="column"
            style={{
              background: "rgba(255, 0, 0, 0.08)",
              borderLeft: "0.0625rem solid rgba(255,0,0,0.2)",
              borderRight: "0.0625rem solid rgba(255,0,0,0.2)",
              height: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
