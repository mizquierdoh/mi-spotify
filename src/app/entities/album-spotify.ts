import { ImageSpotify } from "./image-spotify";

export class AlbumSpotify {
    id: string;
    name: string;
    releaseDate: Date;
    artistId: string;
    artistName: string;
    externalUrl: string;
    href: string;
    images: ImageSpotify[];

    static parse(albumObject: any): AlbumSpotify {
        if (!albumObject) {
            return null;
        }
        let album = new AlbumSpotify();
        album.id = albumObject['id'];
        album.name = albumObject['name'];
        album.releaseDate = new Date(albumObject['releaseDate']);
        album.artistId = albumObject['artistId'];
        album.artistName = albumObject['artistName'];
        album.externalUrl = albumObject['externalUrl'];
        album.href = albumObject['href'];
        album.images = albumObject['images'].map(i => ImageSpotify.parse(i)).sort((a, b) => b.width - a.width);
        return album;
    }
}
