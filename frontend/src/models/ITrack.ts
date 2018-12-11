import IBaseModel from "./IBaseModel";
import IImage from "./IImage";

interface ITrack extends IBaseModel {
    id: number;
    title: string;
    durationMs: number;
    index?: number;
    albumsName: string;
    artistName: string[];
    artistId: number[];
    albumId: number;
    previewUrl: string | null;
    explicit: boolean;
    price: number;
    images: IImage[];
}

export default ITrack;
