import IBaseModel from "./IBaseModel";
interface ITrack extends IBaseModel {
    id: number;
    title: string;
    durationMs: number;
    index?: number;
    albumsName: string;
    artistName: string;
    albumId: number;
    previewUrl: string | null;
    
}

export default ITrack;