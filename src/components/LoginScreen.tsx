import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
import { MusicApi } from '../services/MusicApi'


type Props = {
    onLoginComplete: () => void
    musicApi: MusicApi
}

export class LoginScreen extends Component<Props, {}> {
    render() {
        return (<Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450}}>
                <Header as='h2' color='black' textAlign='center'>
                    Playlist Tools for Apple Music
                </Header>
                <Form size='large'>
                        <Button primary size='large' onClick={this.login}>Connect to Apple Music</Button>
                </Form>
                <Message>Your credentials are handled by Apple and not sent to this server.</Message>
            </Grid.Column>
        </Grid>)
    }

    private login = () => { this.props.musicApi.handleAuth(this.props.onLoginComplete) }
}