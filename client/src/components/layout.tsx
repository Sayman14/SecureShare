import { Link } from "wouter";
import { Shield } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const NavLinks = () => (
    <>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/terms">Terms & Conditions</Link>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80">
            <Shield className="h-6 w-6" />
            <span className="font-semibold">SecureShare</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="mt-auto border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <nav className="flex justify-center gap-6 mb-4 text-sm text-muted-foreground">
            <NavLinks />
          </nav>
          <p className="text-sm text-muted-foreground">© 2024 SecureShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}