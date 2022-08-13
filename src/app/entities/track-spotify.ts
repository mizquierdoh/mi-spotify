export class TrackSpotify {
    id: string;
    name: string;
    trackNumber: number;
    discNumber: number;
    albumId: string;
    albumName: string;
    albumReleaseDate: Date;
    artistId: string;
    artistName: string;
    externalURL: string;
    href: string;

    static parse(trackObject: any): TrackSpotify {
        if (!trackObject) {
            return null;
        }
        let track = new TrackSpotify();
        track.id = trackObject['id'];
        track.name = trackObject['name'];
        track.trackNumber = trackObject['trackNumber'];
        track.discNumber = trackObject['discNumber'];
        track.albumId = trackObject['albumId'];
        track.albumName = trackObject['albumName'];
        track.albumReleaseDate = new Date(trackObject['releaseDate']);

        track.externalURL = trackObject['externalURL'];
        track.href = trackObject['href'];
        return track;
    }
}
