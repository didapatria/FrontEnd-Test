'use client'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "http://103.183.75.112/api/directory/dataList";
        const res = await fetch(proxyUrl + apiUrl, {
          headers: {
            "x-requested-with": "XMLHttpRequest",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const dataList: {
          data: [],
          status: number
        } = await res.json();
        setDataList(dataList.data)
        setStatus(200)
        setLoading(false)
      } catch (error: { message: string } | any) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data: " + error.message || "Unknown error")
        setStatus(400)
        setLoading(false)
        throw error;
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div>
      {loading? (
        <div>loading...</div>
      ) : (
        <div>
          {status == 400 && <div>{error}</div>}
          {dataList?.map((
            data: {
              id: number,
              title: string,
              description: string,
              banner: string,
              logo: string
              playlist: [],
            }
          ) => (
            <div key={data.id}>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
              <img src={data.banner} alt="" />
              <img src={data.logo} alt="" />
              {data.playlist?.map((
                playlist: {
                  id: number,
                  title: string,
                  description: string,
                  url: string,
                  type: "image" | "video",
                }
              ) => (
                <div key={playlist.id}>
                  <h1>{playlist.title}</h1>
                  <p>{playlist.description}</p>
                  {playlist.type == "image" ?
                    <img src={playlist.url} alt="" />
                    :
                    <video src={playlist.url} controls />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;