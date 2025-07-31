import { Gif, GiphyItem } from "../interfaces/giphy-response";


export class GifMapper {

    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id: item.id,
            tittle: item.title,
            url: item.images.original.url
        };
    }

    static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
        return items.map(this.mapGiphyItemToGif);
    }

}