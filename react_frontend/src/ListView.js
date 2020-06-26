import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Popup from './Popup';

import './ListView.css';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.listItems = []
        for (let i = 0; i < this.props.data.length; i++) {
            this.listItems.push(
                <ItemCard
                    itemData={this.props.data[i]}
                    key={JSON.stringify(this.props.data[i])}
                />
            )
        }
    }

    render() {
        return (
            <div>
                <div className="ListView"><Grid fluid><Col around="xs"><Row around="xs">{this.listItems}</Row></Col></Grid></div>
            </div>
        );
    }
}


class ItemCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            boundingRect: null
        };
    }

    togglePopup = () => {
        this.setState(prevState => ({ showPopup: !prevState.showPopup }));
        this.setState(prevState => ({ boundingRect: this.refs.myElement.getBoundingClientRect() }));
    }

    componentDidUpdate(prevState) {
        if (prevState.showPopup !== this.state.showPopup) {
            const showScroll = !this.state.showPopup;
            document.body.style.overflowY = showScroll ? "scroll" : "hidden";
        }
    }

    render() {
        return (
            <div ref="myElement">
                <div
                    className="itemcard"
                    onClick={this.togglePopup}
                >
                    <ItemImage
                        url={this.props.itemData.item_images[0]}
                        alt={this.props.itemData.item_name}
                    />
                    <ItemInfo
                        name={this.props.itemData.item_name}
                        vendor={this.props.itemData.item_vendor}
                        price={this.props.itemData.item_price}
                    />
                </div>
                <Popup
                    itemData={this.props.itemData}
                    showPopup={this.state.showPopup}
                    itemCardBoundingRect={this.state.boundingRect}
                    closePopup={this.togglePopup.bind(this)}
                />
            </div>
        );
    }
}

class ItemImage extends React.Component {
    render() {
        return (
            <img draggable="false"
                className="itemimage"
                src={this.props.url}
                alt={"Image of " + this.props.alt}
            ></img>
        );
    }
}

class ItemInfo extends React.Component {
    render() {
        return (
            <div className="iteminfo">
                <p className="name">{this.props.name}</p>
                <p className="vendor">{this.props.vendor}</p>
                <p className="price">{this.props.price}</p>
            </div>
        );
    }
}