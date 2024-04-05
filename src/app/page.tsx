'use client'

import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDataList } from "@/redux/slices/dataListSlice";
import { DataListItems, Playlist } from "@/redux/types";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {dataList?.map((data: DataListItems | any) => (
        <div key={data.id}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <img src={data.banner} alt="" />
          <img src={data.logo} alt="" />
          {data.playlist?.map((playlist: Playlist) => (
            <div key={playlist.id}>
              <h1>{playlist.title}</h1>
              <p>{playlist.description}</p>
              {playlist.type === "image"? (
                <img src={playlist.url} alt="" />
              ) :(
                <video src={playlist.url} controls />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;