import React, { Component } from "react";
import { Item, ItemGroup, Placeholder, Input, InputOnChangeData, Segment, Label, Header } from 'semantic-ui-react'
import { Playlist } from "./Playlist";
import { MusicApi } from "../services/MusicApi";
import { PlaylistReference } from "../types/MusicTypes";
 
type State = {
    playlists: PlaylistReference[] | null
    filter: string | null
    activeTimeout: number | null
    selectedPlaylist: PlaylistReference | null
}

type Props = {
    musicApi: MusicApi,
    onPlaylistSelected: (playlist: PlaylistReference) => void
}

export class PlaylistSelector extends Component<Props, State> {

    state: State = { 
        playlists: null,
        filter: null,
        activeTimeout: null,
        selectedPlaylist: null
    }

    render() {
        return (
            <div>
                <Segment >
                    <Header as='h3'>Select A Playlist</Header>
                    <Input icon="search" placeholder="Filter Playlists..." onChange={this.onFilterChanged} />
                    <ItemGroup divided style={{ height: '50vh', overflow: 'auto'}}>
                        {this.playlistItems()}
                    </ItemGroup>
                </Segment>
                <Segment>
                    <Input icon="list" iconPosition='left' placeholder="URL..."  action={{ content: "Go"}}/>
                    <Label pointing='left'>Or Paste a Pubic Playlist URL</Label>
                </Segment>
            </div>
        );
    }

    componentDidMount() {
        this.props.musicApi.getPlaylists()
            .then(playlists => this.setState({ playlists: playlists }));
    }

    private onFilterChanged = (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        if(this.state.activeTimeout) {
            window.clearTimeout(this.state.activeTimeout);
        }

        let filterTerm = e.target.value;
        let newTimer = window.setTimeout(() => { 
            this.setState( (prevState) => {
                return {
                    ...prevState,
                    filter: filterTerm
                }
            })
        }, 100);

        this.setState((prevState) => {
            return {
                ...prevState,
                activeTimeout: newTimer
            }
        });
    }

    private onPlaylistSelected = (playlist: PlaylistReference) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedPlaylist: playlist
            }
        })

        this.props.onPlaylistSelected(playlist)
    }

    private playlistItems = () => {
        if(this.state.playlists) {
            let filteredPlaylists = this.state.playlists.filter((p) => { 
                return this.state.filter === null || p.name.toLowerCase().includes(this.state.filter.toLowerCase())
            })

            return filteredPlaylists.map((playlist) => {
                return <Playlist key={playlist.id} playlist={playlist} handlePlaylistSelected={this.onPlaylistSelected} />
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