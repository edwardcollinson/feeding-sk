export const metadata = {
  title: "Feeding SK Studio",
  description: "Content management for Feeding SK",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="sanity" style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
