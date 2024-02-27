import Header from "./header";
import Footer from "./footer";

export default function HomeLayout({ children }) {
  return (
    <>
    <Header />
    <main>
        {children}
    </main>
    <Footer />
    </>
  );
}