import Navbar from "@/components/Navbar/navbar";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section><Navbar isHomePage={false} />{children}</section>;
}
