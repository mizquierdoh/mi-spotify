import { ImageSpotify } from "./image-spotify";

export class ArtistSpotify {
    externalUrl: string;
    genres: string[];
    href: string;
    id: string;
    images: ImageSpotify[];
    name: string;

    static parse(artistObject: any): ArtistSpotify {
        if (!artistObject) {
            return null;
        }
        let artist = new ArtistSpotify();
        artist.externalUrl = artistObject['externalUrl'];
        artist.genres = artistObject['genres'];
        artist.href = artistObject['href'];
        artist.id = artistObject['id'];
        artist.images = artistObject['images'].map(i => ImageSpotify.parse(i)).sort((a, b) => b.width - a.width);
        artist.name = artistObject['name'];
        return artist;
    }

}
