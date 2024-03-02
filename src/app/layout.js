import "./globals.css";

export const metadata = {
  title: "Christopher Bannon's Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"font-VCROSDMono bg-primary-blue text-white"}>
        {children}
      </body>
    </html>
  );
}
