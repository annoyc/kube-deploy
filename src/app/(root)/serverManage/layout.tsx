export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

import RootLayoutBase from "../page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayoutBase>
      <div className="p-8">{children}</div>
    </RootLayoutBase>
  );
}