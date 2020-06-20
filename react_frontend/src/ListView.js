import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './ListView.css';
import Popup from './Popup';
import data from './dummyData.json';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.listItems = []
        for (let i = 0; i < data.length; i++) {
            this.listItems.push(
                <ItemCard
                    itemData={data[i]}
                    key={JSON.stringify(data[i])}
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
            showPopup: false
        };
    }

    togglePopup = () => this.setState(prevState => ({ showPopup: !prevState.showPopup }))

    componentDidUpdate(prevState) {
        if(prevState.showPopup !== this.state.showPopup){
            const showScroll = !this.state.showPopup;
            document.body.style.overflow = showScroll ? "scroll" : "hidden";
        }
    }

    componentDidMount() {
        this.rect = this.refs.myElement.getBoundingClientRect();
    }
    getRect() {
        if(this.rect){
            return this.refs.myElement.getBoundingClientRect()
        }
        return this.rect;
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
                    closePopup={this.togglePopup.bind(this)}
                    getItemCardRect={this.getRect.bind(this)}
                    showPopup={this.state.showPopup}
                />
            </div>
        );
    }
}

/*

                

*/

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


