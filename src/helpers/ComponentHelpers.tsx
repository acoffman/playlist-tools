import React from "react"
import { WithArtwork } from "../types/MusicTypes"
import { Icon, Item } from "semantic-ui-react"

export function imageMarkup(item: WithArtwork) {
    if (item.artworkUrl === null) {
        return <Icon style={{ marginRight: "1.4em" }} size="large" name="music" />
    } else {
        return <Item.Image size="mini" src={item.artworkUrl} />
    }
}