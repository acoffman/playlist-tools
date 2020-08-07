import React, { Component } from "react";
import { Grid, Step, Button } from "semantic-ui-react";
import { PlaylistSelector } from "./PlaylistSelector";
import { MusicApi } from "../services/MusicApi";
import { PlaylistReference } from "../types/MusicTypes";
import { DiffView } from "./DiffView";

type State = {
    firstPlaylist: PlaylistReference | null
    secondPlaylist: PlaylistReference | null
}

type Props = {
    musicApi: MusicApi
}

type Step = "first" | "second" | "third"

export class PlaylistComparison extends Component<Props, State> {

    state: State = {
        firstPlaylist: null,
        secondPlaylist: null
    }

    render() {
        return <Grid style={{ overflow: 'auto' }} >
            <Grid.Column >
                <Grid.Row style={{ marginBottom: '10px' }}>
                    <Button floated="right" onClick={this.reset}>Start Over</Button>
                    <Step.Group ordered>
                        <Step active={this.stepStatusHelper("first", "active")} completed={this.stepStatusHelper("first", "completed")}>
                            <Step.Content>
                                <Step.Title>
                                    First Playlist
                            </Step.Title>
                                <Step.Description>
                                    {this.state.firstPlaylist ? `(${this.state.firstPlaylist.name})` : "Select the first playlist to compare."}
                                </Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active={this.stepStatusHelper("second", "active")} completed={this.stepStatusHelper("second", "completed")}>
                            <Step.Content>
                                <Step.Title>
                                    Second Playlist
                            </Step.Title>
                                <Step.Description>
                                    {this.state.secondPlaylist ? `(${this.state.secondPlaylist.name})` : "Select the playlist to compare it with."}
                                </Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active={this.stepStatusHelper("third", "active")} completed={this.stepStatusHelper("third", "completed")}>
                            <Step.Content>
                                <Step.Title>
                                    Results
                            </Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Grid.Row>
                {this.bodyContent()}
            </Grid.Column>
        </Grid>
    }

    private bodyContent = () => {
        let stepNum: Step = this.state.firstPlaylist == null ? "first" : "second"
        if (this.state.firstPlaylist == null || this.state.secondPlaylist == null) {
            return <PlaylistSelector musicApi={this.props.musicApi} onPlaylistSelected={this.handlePlaylistSelected(stepNum)} />
        } else {
            return <DiffView musicApi={this.props.musicApi} firstPlaylist={this.state.firstPlaylist} secondPlaylist={this.state.secondPlaylist}/>
        }
    }

    private handlePlaylistSelected = (playlist: Step) => {
        if (playlist === "first") {
            return (playlist: PlaylistReference) => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        firstPlaylist: playlist
                    }

                });
            }
        } else {
            return (playlist: PlaylistReference) => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        secondPlaylist: playlist
                    }
                });
            }
        }
    }

    private stepStatusHelper = (step: Step, status: "active" | "completed"): boolean => {
        if (step === 'first') {
            if (status === 'active') {
                return (this.state.firstPlaylist === null)
            } else if (status === 'completed') {
                return (this.state.firstPlaylist != null)
            }
        } else if (step === 'second') {
            if (status === 'active') {
                return (this.state.firstPlaylist != null && this.state.secondPlaylist === null)
            } else if (status === 'completed') {
                return (this.state.secondPlaylist != null)
            }
        } else if (step === 'third') {
            if (status === 'active') {
                return (this.state.firstPlaylist != null && this.state.secondPlaylist != null)
            } else if (status === 'completed') {
                return false
            }
        }
        return false
    }

    private reset = () => {
        this.setState({
            firstPlaylist: null,
            secondPlaylist: null
        });
    }
}