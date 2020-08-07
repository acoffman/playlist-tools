import React, { Component } from "react";
import { Menu, Container, Segment, Button } from "semantic-ui-react"
import { MusicApi } from "../services/MusicApi";
import { LoginScreen } from "./LoginScreen";
import { ToolLink } from "./ToolLink"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PlaylistComparison } from "./PlaylistComparison";

type State = {
    loggedIn: boolean
}

type Props = {
    musicApi: MusicApi
}

export class MainPage extends Component<Props, State> {
    state: State = {
        loggedIn: this.props.musicApi.loggedIn
    }

    render() {
        if (!this.state.loggedIn) {
            return <LoginScreen onLoginComplete={this.handleLogin} musicApi={this.props.musicApi} />
        }
        return <Container style={{ marginTop: '5em' }}>{this.content()}</Container>
    }

    private content = () => {
        return (<div>
            <Router>
                <Menu fixed='top' inverted>
                    <Container>
                        <ToolLink iconName='columns' text='Playlist Tools' path='/compare' />
                    </Container>
                    <Container>
                        <Menu.Item position='right'>
                            <Button inverted onClick={this.handleLogout}>Sign Out</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
                <Segment stacked>
                    <div>
                        <Switch>
                            <Route exact path='/compare'>
                                <PlaylistComparison musicApi={this.props.musicApi}/>
                            </Route>
                            <Route exact path='/'>
                                <PlaylistComparison musicApi={this.props.musicApi}/>
                            </Route>
                        </Switch>
                    </div>
                </Segment>
            </Router>
        </div>)

    }

    private handleLogin = () => { this.setState({ loggedIn: true }) }
    private handleLogout = () => { this.props.musicApi.handleDeAuth( () => this.setState({ loggedIn: false })) }
}