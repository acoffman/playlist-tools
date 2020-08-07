import { MusicApi } from "./MusicApi";
import { PlaylistReference, PlaylistDiff, TrackReference } from "../types/MusicTypes";

export class PlaylistDiffer {
    musicApi: MusicApi

    constructor(musicApi: MusicApi) {
        this.musicApi = musicApi
    }

    async comparePlaylists(p1: PlaylistReference, p2: PlaylistReference):  Promise<PlaylistDiff> {
        let playlist1Tracks = await this.musicApi.getPlaylistTracks(p1.id)
        let playlist2Tracks = await this.musicApi.getPlaylistTracks(p2.id)

        let [playlist1DeDupedTracks, playlist1Ids] = this.dedupTracks(playlist1Tracks)
        let [playlist2DeDupedTracks, playlist2Ids] = this.dedupTracks(playlist2Tracks)

        let playlist1Exclusive = playlist1DeDupedTracks.filter(track => !playlist2Ids.has(track.id))
        let playlist2Exclusive = playlist2DeDupedTracks.filter(track => !playlist1Ids.has(track.id))

        let inBoth = playlist1DeDupedTracks.filter(track => playlist2Ids.has(track.id))

        return {
            firstPlaylist: p1,
            secondPlaylist: p2,
            exclusiveToFirst: playlist1Exclusive,
            exclusiveToSecond: playlist2Exclusive,
            inBoth: inBoth
        }
    }

    private dedupTracks(tracks: TrackReference[]): [TrackReference[], Set<string>] {
        let ids = new Set<string>()
        let uniqTracks: TrackReference[] = []

        tracks.forEach((t) => {
            if(!ids.has(t.id)) {
                ids.add(t.id)
                uniqTracks.push(t)
            }
        })

        return [uniqTracks, ids]
    }
}