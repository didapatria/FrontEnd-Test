import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Playlist } from "@/redux/types"
import {
  generateSlug
} from "@/redux/slices/dataListSlice";
import {
  setShow
} from "@/redux/slices/UISlice"

type NavbarProps = {
  logo: string;
  title: string;
  playlist: Playlist[];
}

const Navbar: React.FC<NavbarProps> = ({ logo, title, playlist }) => {
  const dispatch = useAppDispatch();

  const {
    show
  } = useAppSelector(
    (state : RootState) => state.UIReducers
  );

  return (
    <nav className="fixed z-10 w-full bg-sky-400">
      <div className="container mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-8" />
          {/* Title */}
          <a href={`#${generateSlug(title)}`} className="text-lg font-bold capitalize text-white">{title}</a>
        </div>
        <div className="block lg:hidden">
          {/* Mobile menu button */}
          <button onClick={() => dispatch(setShow(!show))} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden capitalize lg:flex lg:flex-1 lg:items-center lg:justify-end">
          {playlist.map((playlist: Playlist) => (
            <a href={`#${generateSlug(playlist.title)}`} className="px-4 py-2 text-white">{playlist.title}</a>
          ))}
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`relative ${show ? "block" : "hidden"} w-full capitalize lg:hidden`}>
        <div className="w-1/2 bg-sky-400 h-screen absolute inset-y-0 right-0">
          {playlist.map((playlist: Playlist) => (
            <a href={`#${generateSlug(playlist.title)}`} className="block px-4 py-2 text-white">{playlist.title}</a>
          ))}
        </div>
        <div className="absolute inset-0 bg-black w-full h-screen -z-10 opacity-50"></div>
      </div>
    </nav>
  );
};

export default Navbar;