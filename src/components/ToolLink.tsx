import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

type Props = {
    text: string
    iconName: string
    path: string
}

export class ToolLink extends Component<Props, {}> {
    render() {
        let typedIcon = this.props.iconName as SemanticICONS;
        return(
            <NavLink to={this.props.path}>
                <Menu.Item>
                    <Icon circular name={typedIcon} />
                    {this.props.text}
                </Menu.Item>
            </NavLink>
        )
    }
}