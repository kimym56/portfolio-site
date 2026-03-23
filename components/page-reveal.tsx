interface PageRevealProps {
  children: React.ReactNode;
  variant?: "animated" | "static";
}

export function PageReveal({
  children,
  variant = "static",
}: PageRevealProps) {
  return (
    <div className="page-reveal" data-page-reveal={variant}>
      {children}
    </div>
  );
}
