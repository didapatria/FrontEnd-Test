type PlayListProps = {
  title: string,
  description: string,
  url: string,
  type: string,
}
  
  const PlayList: React.FC<PlayListProps> = ({ title, description, url, type }) => {
    return (
      <section className="pt-8">
        <div className="container mx-auto space-y-8 md:space-y-0 (block md:flex) (md:flex-row-reverse flex flex-col) (items-center) (justify-center)">
          <div className={`mx-4 w-11/12 space-y-4 text-center md:space-y-6 ${title == "Mobile App" ? "md:text-right" : "md:text-left"} (md:w-1/2) (md:w-full)`}>
            <h1 className="text-3xl font-bold capitalize leading-none md:text-4xl md:leading-normal lg:text-5xl">{title}</h1>
            <p className="text-2xl">{description}</p>
            <button type="submit" className="rounded-full bg-sky-400 px-8 py-2 text-white hover:bg-opacity-75">{type === "image" ? "Unduh Image" : "Unduh Video"}</button>
          </div>
          <div className="mx-4 w-11/12 md:mx-0 (md:w-1/2) (md:w-full)">
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