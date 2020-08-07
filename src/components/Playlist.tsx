import React, { Component } from "react";
import { Item } from 'semantic-ui-react'
import { PlaylistReference } from "../types/MusicTypes";
import { imageMarkup } from "../helpers/ComponentHelpers";
 
type Props = {
    playlist: PlaylistReference
    handlePlaylistSelected: (playlist: PlaylistReference) => void
}

export class Playlist extends Component<Props, {}> {
    render() {
        let playlist = this.props.playlist;
        return (
            <Item className="playlistItem" onClick={() => this.props.handlePlaylistSelected(playlist)}>
                {imageMarkup(playlist)}
                <Item.Content verticalAlign='middle'>
                        {playlist.name}
                </Item.Content>
            </Item>
        );
    }
}