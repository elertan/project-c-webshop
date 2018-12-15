
import IAlbum from "./IAlbum";
import ITrack from "./ITrack";

interface IProduct {
    id: number;
    track?: ITrack;
    album?: IAlbum;
    price: number;
}

export default IProduct;
