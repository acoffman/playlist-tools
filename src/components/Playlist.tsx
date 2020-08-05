import React, { Component } from "react";
import { Item } from 'semantic-ui-react'
 
type Props = {
    name: string;
    id: string;
    artworkUrl: string;
}

export class Playlist extends Component<Props, {}> {
    render() {
        return (
            <Item>
                <Item.Image size="mini" src={this.props.artworkUrl}/>
                <Item.Content verticalAlign='middle'>
                    <Item.Header as='a'>
                        {this.props.name}
                    </Item.Header>
                </Item.Content>
            </Item>
        );
    }
}