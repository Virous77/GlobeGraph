import GDPGraph from "@/components/gdp";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <section className="p-3">
        <GDPGraph />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
