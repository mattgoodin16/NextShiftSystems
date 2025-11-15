export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-20">
      <div className="max-w-6xl mx-auto p-6 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} NextShift Systems</p>
        <p>Work Smarter. Automate Faster.</p>
      </div>
    </footer>
  );
}