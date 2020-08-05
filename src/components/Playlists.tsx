import React, { Component } from "react";
import { Item, ItemGroup, Placeholder } from 'semantic-ui-react'
import { Playlist } from "./Playlist";
import { MusicApi } from "../services/MusicApi";
 
type State = {
    playlists: any[] | null;
}

type Props = {
    musicApi: MusicApi
}

export class Playlists extends Component<Props, State> {

    state: State = { 
        playlists: null
    }

    render() {
        return (
            <ItemGroup divided link>
                {this.playlistItems()}
            </ItemGroup>
        );
    }

    componentDidMount() {
        this.props.musicApi.getPlaylists()
            .then(playlists => this.setState({ playlists: playlists }));
    }

    private playlistItems = () => {
        if(this.state.playlists) {
            return this.state.playlists.map((playlist) => {
                let artworkUrl = this.props.musicApi.getArtworkUrl(playlist)
                return <Playlist name={playlist.attributes.name} id={playlist.id} artworkUrl={artworkUrl} />
            });
        } else {
            return(
                <Item>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </Item>
            );
        }
    }
}