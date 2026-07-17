import HeroInformation from "./HeroInformation";
import MotionDiagram from "./MotionDiagram";

function Hero() {
  return (
    <section className="h-screen flex gap-2 px-12 mt-4 w-full">
      <div className="w-1/2 ml-12">
        <HeroInformation />
      </div>
      <div className="w-1/2">
        <MotionDiagram />
      </div>
    </section>
  );
}

export default Hero;
