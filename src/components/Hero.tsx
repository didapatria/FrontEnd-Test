import {
  generateSlug
} from "@/redux/slices/dataListSlice";

type HeroProps = {
  title: string
  description: string;
  banner: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, banner }) => {
  return (
    <section id={`${generateSlug(title)}`} className="relative aspect-video w-full bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
      {/* Descripcion */}
      <div className="container absolute inset-0 bottom-0 mx-auto flex items-center justify-center text-center text-white md:bottom-40">
        <h3 className="mx-4 text-3xl font-bold leading-none md:mx-0 md:text-4xl md:leading-normal lg:text-5xl lg:leading-normal">{description}</h3>
      </div>
    </section>
  );
};

export default Hero;