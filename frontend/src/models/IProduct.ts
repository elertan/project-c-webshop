
import IAlbum from "./IAlbum";
import { ITrackData } from "src/components/views/reusable/TrackRow/TrackRow";

interface IProduct {
    id: number;
    track?: ITrackData;
    album?: IAlbum;
}

export default IProduct;