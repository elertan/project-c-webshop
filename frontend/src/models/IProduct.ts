
import IAlbum from "./IAlbum";
import ITrack from "./ITrack";

interface IProduct {
    id: number;
    track?: ITrack;
    album?: IAlbum;
}

export default IProduct;
