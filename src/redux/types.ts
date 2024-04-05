type DataListState = {
  dataList: DataList[];
  loading: boolean;
  error: string;
}

type DataList = {
  data: DataListItems[];
  status: number;
}

type DataListItems = {
  id: number;
  title: string;
  description: string;
  banner: string;
  logo: string;
  playlist: Playlist[];
}

type Playlist = {
  id: number;
  dir_id: number;
  title: string;
  description: string;
  url: string;
  type: "image" | "video";
}

type UIState = {
  show: boolean;
}

type DownloadState = {
  url: string | null;
}

export type {
  DataListState,
  DataList,
  DataListItems,
  Playlist,
  UIState,
  DownloadState }