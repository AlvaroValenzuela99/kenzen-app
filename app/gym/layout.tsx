import Footer from "@/components/ui/footer";
import GymSideNav from "@/components/ui/gym-sidenav";

// export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen bg-gray-100">
        <GymSideNav />
        <div className="flex-grow flex flex-col">
          <main className="flex-grow overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }