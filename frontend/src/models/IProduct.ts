import ITrack from "./ITrack";
import IAlbum from "./IAlbum";

interface IProduct {
    id: number;
    track?: ITrack;
    album?: IAlbum;
}

export default IProduct;