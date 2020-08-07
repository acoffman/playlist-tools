import axios, { AxiosInstance } from "axios";
import MusicKitProvider from "./MusicKitProvider";
import { PlaylistReference, TrackReference } from "../types/MusicTypes";

export class MusicApi {
    loggedIn = false
    client: AxiosInstance | null = null
    musicKitInstance = MusicKitProvider.getMusicKitInstance()

    constructor() {
        if (this.musicKitInstance && this.musicKitInstance.isAuthorized) {
            this.loggedIn = true
            this.setupAxiosClient(this.musicKitInstance)
        }
    }

    async getPlaylists(): Promise<PlaylistReference[]> {
        let libraryResp = await this.callWrapper('/v1/me/library/playlists')
        return libraryResp.map((pl: any) => {
            return {
                id: pl.id,
                name: pl.attributes.name,
                canEdit: pl.attributes.canEdit,
                library: true,
                artworkUrl: this.getArtworkUrl(pl)
            }
        });
    }


    async getPlaylistTracks(playlistId: string): Promise<TrackReference[]> {
        let tracksResp = await this.callWrapper(`/v1/me/library/playlists/${playlistId}/tracks`)
        return tracksResp.map((track: any)=> {
            return {
                id: track.id,
                name: track.attributes.name,
                artistName: track.attributes.artistName,
                albumName: track.attributes.albumName,
                artworkUrl: this.getArtworkUrl(track)
            }
        });
    }

    async getPublicPlaylistTracks(playlistId: string): Promise<TrackReference[]> {
        let tracksResp = await this.callWrapper(`/v1/catalog/us/playlists/${playlistId}/tracks`)
        return tracksResp.map((track: any)=> {
            return {
                id: track.id,
                name: track.attributes.name,
                artistName: track.attributes.artistName,
                albumName: track.attributes.albumName,
                artworkUrl: this.getArtworkUrl(track)
            }
        });
    }

    getArtworkUrl(data: any) {
        if(data.attributes.artwork) {
            return MusicKitProvider.getPackage().formatArtworkURL(data.attributes.artwork, 128, 128)
        } else {
            return null
        }
    }

    handleAuth(callback: () => void) {
        if (this.musicKitInstance.isAuthorized) {
            this.setupAxiosClient(this.musicKitInstance)
            callback()
        } else {
            this.musicKitInstance.authorize()
                .then(() => this.setupAxiosClient(this.musicKitInstance))
                .then(() => callback())
        }
    }

    handleDeAuth(callback: () => void) {
        if (this.musicKitInstance.isAuthorized) {
            this.musicKitInstance.unauthorize()
                .then(() => {
                    this.client = null
                    this.loggedIn = false
                })
                .then(() => callback());
        } else {
            callback();
        }
    }

    private setupAxiosClient(musicKitInstance: any) {
        this.loggedIn = true
        this.client = axios.create({
            baseURL: 'https://api.music.apple.com/',
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
