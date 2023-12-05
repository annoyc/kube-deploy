export const metadata = {
  title: "kube应用列表",
  description: "展示kube应用列表组件",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-start justify-center overflow-auto p-8">
      {children}
    </div>
  );
}
