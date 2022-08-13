export class ImageSpotify {
    height: number;
    width: number;
    url: string;

    static parse(imageObject: any): ImageSpotify {
        if (!imageObject) {
            return null;
        }
        let image = new ImageSpotify();
        image.height = imageObject['height'];
        image.width = imageObject['width'];
        image.url = imageObject['url'];

        return image;
    }
}
