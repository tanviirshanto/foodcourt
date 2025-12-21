import Navbar from "@/components/Navbar/Navbar";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
