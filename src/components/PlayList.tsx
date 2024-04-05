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
          <div className="mx-4 w-11/12 space-y-4 text-center md:space-y-6 (md:text-left) (md:text-right) (md:w-1/2) (md:w-full)">
            <h1 className="text-3xl font-bold capitalize leading-none md:text-4xl md:leading-normal lg:text-5xl">{title}</h1>
            <p className="text-2xl">{description}</p>
            <button type="submit" className="rounded-full bg-sky-400 px-8 py-2 text-white hover:bg-opacity-75">(Unduh Image) (Unduh Video)</button>
          </div>
          <div className="mx-4 w-11/12 md:mx-0 (md:w-1/2) (md:w-full)">
            (<img src={url} alt="" className="rounded-none (md:rounded-l-full) (md:rounded-r-full)" />)
            (<video src={url} className="aspect-video w-full" controls />)
          </div>
        </div>
      </section>
    );
  };
  
  export default PlayList;