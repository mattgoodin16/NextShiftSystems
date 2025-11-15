export default function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="NextShift Systems" className="w-10 h-10" />
          <span className="font-bold text-lg">NextShift Systems</span>
        </a>
        <nav className="space-x-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/quote" className="btn btn-primary">Quote Me</a>
        </nav>
      </div>
    </header>
  );
}
