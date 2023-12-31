export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function Navbar({ children }: { children: React.ReactNode }) {
  return <div className="p-8">{children}</div>;
}
