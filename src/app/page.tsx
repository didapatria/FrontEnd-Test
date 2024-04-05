'use client'

import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDataList } from "@/redux/slices/dataListSlice";
import { DataListItems, Playlist } from "@/redux/types";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlayList from "@/components/PlayList";
import Footer from "@/components/Footer";

const Home = () => {
  const dispatch = useAppDispatch();

  const {
    dataList,
    loading,
    error,
  } = useAppSelector(
    (state : RootState) => state.dataListReducers
  );

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(fetchDataList());
      } catch (error: { message: string } | any) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
    const intervalId = setInterval(() => {
      fetchDataList();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  if (loading) {
    return <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900 animate-ping">Loading...</div>;
  }

  if (error) {
    return <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-hidden">
      {dataList?.map((data: DataListItems | any) => (
        <div key={data.id}>
          {/* Navbar Section */}
          <Navbar
            logo={data.logo}
            title={data.title}
            playlist={data.playlist}
          />
          <main className="space-y-8 divide-y-4 divide-solid divide-slate-500">
            {/* Hero Section */}
            <Hero
              title={data.title}
              description={data.description}
              banner={data.banner}
            />
            {data.playlist?.map((playlist: Playlist) => (
              <div key={playlist.id}>
                {/* Playlist Section */}
                <PlayList
                  title={playlist.title}
                  description={playlist.description}
                  url={playlist.url}
                  type={playlist.type}
                />
              </div>
            ))}
          </main> 
          {/* Footer Section */}
          <Footer
            title={data.title}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;