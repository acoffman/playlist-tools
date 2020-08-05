import axios, { AxiosInstance } from "axios";
import MusicKitProvider from "./MusicKitProvider";

export class MusicApi {
    loggedIn = false
    client: AxiosInstance | null = null
    musicKitInstance = MusicKitProvider.getMusicKitInstance()

    constructor() {
        this.handleAuth()
    }

    async getPlaylists() {
        let libraryResp = await this.callWrapper('/me/library/playlists')
        return libraryResp
    }

    async getPlaylistTracks(playlistId: string) {
        let tracksResp = await this.callWrapper(`/me/library/playlists/${playlistId}/tracks`)
        return tracksResp
    }

    getArtworkUrl(data: any) {
        if(data.attributes.artwork) {
            return MusicKitProvider.getPackage().formatArtworkURL(data.attributes.artwork, 128, 128)
        } else {
            return "/logo192.png"
        }
    }

    private handleAuth() {
        if (this.musicKitInstance.isAuthorized) {
            this.setupAxiosClient(this.musicKitInstance)
        } else {
            this.musicKitInstance.authorize().then(() => this.setupAxiosClient(this.musicKitInstance))
        }
    }

    private setupAxiosClient(musicKitInstance: any) {
        this.loggedIn = true
        this.client = axios.create({
            baseURL: 'https://api.music.apple.com/v1',
            headers: {
                'Authorization': `Bearer ${musicKitInstance.storekit.developerToken}`,
                'Music-User-Token': musicKitInstance.api.userToken
            }
        });
    }

    private async callWrapper(path: string): Promise<any> {
        if (!this.loggedIn || !this.client) {
            console.log('User Not Logged In...');
            return;
        }
        try {
            let resp = await this.client.get(path)
            let data: any[] = []
            data = data.concat(resp.data.data)
            while(resp.data.next) {
                resp = await this.client.get(resp.data.next)
                data = data.concat(resp.data.data)
            }
            return data
        } catch (err) {
            console.log(err)
            return;
        }
    }
}
