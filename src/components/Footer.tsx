import {
  generateSlug
} from "@/redux/slices/dataListSlice";

type FooterProps = {
  title: string;
}

const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <footer id={`${generateSlug(title)}`} className="mt-16 w-full bg-sky-400 p-4">
      <div className="container mx-auto flex items-center justify-center">
        <a href={`#${generateSlug(title)}`} className="py-2 text-lg font-bold capitalize text-white"><span>© 2024</span> { title }</a>
      </div>
    </footer>
  );
};

export default Footer;