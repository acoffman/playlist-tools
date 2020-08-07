export interface PlaylistReference {
    id: string
    canEdit: boolean
    name: string
    library: boolean
    artworkUrl?: string
}

export interface TrackReference {
    id: string
    name: string
    artistName: string
    albumName: string
    artworkUrl: string
}

export interface PlaylistDiff {
    firstPlaylist: PlaylistReference
    secondPlaylist: PlaylistReference
    exclusiveToFirst: TrackReference[]
    exclusiveToSecond: TrackReference[]
    inBoth: TrackReference[]
}

export interface WithArtwork {
    artworkUrl?: string
}