import IBaseModel from "./IBaseModel";
import IImage from "./IImage";
interface IAlbum extends IBaseModel {
    id: number;
    name: string;
    images: { items: IImage[] };
}

export default IAlbum;
