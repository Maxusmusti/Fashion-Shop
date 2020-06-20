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
            <div class="ListView"><Grid fluid><Col around="xs"><Row around="xs">{this.listItems}</Row></Col></Grid></div>
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

    togglePopup = () => this.setState(prevState => ({showPopup: !prevState.showPopup}))

    renderItemInfo() {
        return (
            <ItemInfo
                name={this.props.itemData.item_name}
                vendor={this.props.itemData.item_vendor}
                price={this.props.itemData.item_price}
            />
        );
    }

    renderItemImage() {
        return (
            <ItemImage
                url={this.props.itemData.item_images[0]}
                alt={this.props.itemData.item_name}
            />
        );
    }

    render() {
        return (
            <div>
                <div 
                    class="itemcard"
                    onClick={this.togglePopup} 
                > 
                    {this.renderItemImage()}
                    {this.renderItemInfo()}
                </div>
                {this.state.showPopup ?
                    <Popup
                        itemData={this.props.itemData}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }  
            </div>
        );
    }
}

class ItemInfo extends React.Component {
    render() {
        return (
            <div class="iteminfo">
                <p class="name">{this.props.name}</p>
                <p class="vendor">{this.props.vendor}</p>
                <p class="price">{this.props.price}</p>
            </div>
        );
    }
}

class ItemImage extends React.Component {
    render() {
        return (
            <img draggable="false"
                class="itemimage"
                src={this.props.url}
                alt={"Image of " + this.props.alt}
            ></img>
        );
    }
}


