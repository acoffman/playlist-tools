import React, { Component } from "react";
import { Item, ItemGroup, Input, InputOnChangeData, Segment } from 'semantic-ui-react'
import { TrackReference } from "../types/MusicTypes";
import { imageMarkup } from "../helpers/ComponentHelpers";
 
type Props = {
    tracks: TrackReference[]
}

type State = {
    filter: string | null
    activeTimeout: number | null
}

export class TrackList extends Component<Props, State> {

    state: State = {
        filter: null,
        activeTimeout: null
    }

    render() {
        return (
            <Segment >
                <Input icon="search" placeholder="Filter Tracks..." onChange={this.onFilterChanged} />
                <ItemGroup divided style={{ height: '50vh', overflow: 'auto'}}>
                    {this.tracks()}
                </ItemGroup>
            </Segment>
        );
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

    private tracks = () => {
        let tracks: TrackReference[] = []

        if (this.state.filter === null) {
            tracks = this.props.tracks
        } else {
            let lowerFilter = this.state.filter.toLowerCase()
            tracks = this.props.tracks.filter((t) => {
                return t.artistName.toLowerCase().includes(lowerFilter) || t.name.toLowerCase().includes(lowerFilter)
            });
        }
        return tracks.map((t) => {
            return  <Item key={t.id} className="tracklistItem">
                {imageMarkup(t)}
                <Item.Content verticalAlign="middle">
                    {t.name}
                    <Item.Extra>
                        {t.artistName} - {t.albumName}
                    </Item.Extra>
                </Item.Content>
            </Item>
        });
    }
}