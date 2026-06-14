import { Sidebar } from "@/components/layout/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex gap-10">
        <Sidebar />
        <div className="flex-1 min-w-0 py-8 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
