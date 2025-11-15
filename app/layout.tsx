import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ActionHub from "../components/ActionHub";

export const metadata = {
  title: "NextShift Systems",
  description: "Work Smarter. Automate Faster.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ActionHub />

        {/* ✅ Correct Tawk.to embed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"), s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6912f79c36dfb3195ff1a8a4/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
