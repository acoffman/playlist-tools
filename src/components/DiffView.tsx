import React, { Component } from "react";
import { PlaylistDiff, PlaylistReference } from "../types/MusicTypes";
import { Grid, Header, Loader } from "semantic-ui-react";
import { TrackList } from "./TrackList";
import { MusicApi } from "../services/MusicApi";
import { PlaylistDiffer } from "../services/PlaylistDiffer";

type Props = {
    firstPlaylist: PlaylistReference
    secondPlaylist: PlaylistReference
    musicApi: MusicApi
}

type State = {
    loading: boolean
    diff: PlaylistDiff | null
}

export class DiffView extends Component<Props,{}> {

    state: State = {
        loading: true,
        diff: null
    }

    render() {
        if(this.state.loading || this.state.diff === null) {
            return <Grid style={{ marginTop: '20px', overflow: 'auto'}} >
                <Grid.Column verticalAlign="middle">
                    <Grid.Row style={{ margin: "10em" }}>
                        <Loader active size='big'>
                            Comparing Playlists...
                        </Loader>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        }

        let diff = this.state.diff
        return <Grid columns={3} divided style={{ marginTop: '10px', overflow: 'auto'}} >
            <Grid.Column style={{marginTop: '5px'}}>
                Exclusive to
                <Header as='h4'>{diff.firstPlaylist.name}</Header>
                <TrackList tracks={diff.exclusiveToFirst}> </TrackList>
            </Grid.Column>
            <Grid.Column style={{marginTop: '5px'}}>
                Found in
                <Header as='h4'>Both Playlists</Header>
                <TrackList tracks={diff.inBoth}> </TrackList>
            </Grid.Column>
            <Grid.Column style={{marginTop: '5px'}}>
                Exclusive to
                <Header as='h4'>{diff.secondPlaylist.name}</Header>
                <TrackList tracks={diff.exclusiveToSecond}> </TrackList>
            </Grid.Column>
        </Grid>
    }

    componentDidMount() {
        let differ = new PlaylistDiffer(this.props.musicApi)
        differ.comparePlaylists(this.props.firstPlaylist, this.props.secondPlaylist)
            .then(diff => this.setState({ loading: false, diff: diff}))
    }
}