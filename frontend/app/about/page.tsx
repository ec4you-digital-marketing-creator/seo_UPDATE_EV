import AboutUs from "./include/aboutus";
import WhyChooseUs from "./include/whychoose";
import WhyChooseTxt from "./include/whytxt";
export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-black px-20 md:px-40">
      <AboutUs />
      <WhyChooseUs />
      <WhyChooseTxt />
    </main>
  );
}
