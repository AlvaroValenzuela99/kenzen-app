import SideNav from "@/components/ui/sidenav";

// export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex grow p-6 md:overflow-y-auto md:pd-12 w-full">{children}</div>
      </div>
    );
  }