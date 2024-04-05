import { useAppDispatch } from "@/redux/store";
import { downloadUrl } from "@/redux/slices/downloadSlice";
import {
  generateSlug
} from "@/redux/slices/dataListSlice";
import axios from "axios";

type PlayListProps = {
  title: string,
  description: string,
  url: string,
  type: string,
}
  
const PlayList: React.FC<PlayListProps> = ({ title, description, url, type }) => {
  const dispatch = useAppDispatch();

  const download = (url: string) => {
    axios.get(url, {
      method: "GET",
      responseType: "blob",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      a.click();
      dispatch(downloadUrl(url));
      })
    .catch((error) => {
      console.error("There has been a problem with your axios operation:", error);
    });
  };

  return (
    <section id={`${generateSlug(title)}`} className="pt-8">
      <div className={`container mx-auto space-y-8 md:space-y-0 ${title == "Mobile App" ? "md:flex-row-reverse flex flex-col":"block md:flex"} ${type === "image" ? "items-center" : "justify-center flex flex-col md:space-y-8"}`}>
        <div className={`mx-4 w-11/12 space-y-4 text-center md:space-y-6 ${title == "Mobile App" ? "md:text-right" : "md:text-left"} ${type === "image" ? "md:w-1/2" : "md:w-full md:text-center"}`}>
          <h1 className="text-3xl font-bold capitalize leading-none md:text-4xl md:leading-normal lg:text-5xl">{title}</h1>
          <p className="text-2xl">{description}</p>
          <button
            type="submit"
            className="rounded-full bg-sky-400 px-8 py-2 text-white shadow-md shadow-sky-700 hover:bg-opacity-75"
            onClick={() => download(url)}
          >
            {type === "image" ? "Unduh Image" : "Unduh Video"}
          </button>
        </div>
        <div className={`mx-4 w-11/12 md:mx-0 ${type === "image" ? "md:w-1/2" : "md:w-full"}`}>
        {type === "image" ? 
          (<img src={url} alt="" className={`rounded-none ${title == "Mobile App" ? "md:rounded-r-full" : "md:rounded-l-full"}`} />)
          :
          (<iframe className="w-full aspect-video" src={url} frameBorder="0"  allow="autoplay; fullscreen" allowFullScreen></iframe>)
        }
        </div>
      </div>
    </section>
  );
};

export default PlayList;