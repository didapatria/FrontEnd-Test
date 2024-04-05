type DataListState = {
  dataList: DataList[];
  loading: boolean;
}

type DataList = {
  data: DataListItems[]
  status?: number;
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

export type { DataList, DataListItems, DataListState }