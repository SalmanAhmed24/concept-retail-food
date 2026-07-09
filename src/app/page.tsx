import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Grove from "@/components/Grove";
import Press from "@/components/Press";
import Products from "@/components/Products";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Grove />
        <Press />
        <Products />
        <Quote />
      </main>
      <Footer />
    </>
  );
}
