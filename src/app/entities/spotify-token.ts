export class SpotifyToken {
    access_token: string;
    expires: Date;
    refresh_token: string;

    static parse(tokenObject: any): SpotifyToken {
        if (!tokenObject) {
            return null;
        }
        let token = new SpotifyToken();
        token.access_token = tokenObject['access_token'];
        token.expires = new Date(tokenObject['expires']);
        token.refresh_token = tokenObject['refresh_token'];
        return token;
    }
}

