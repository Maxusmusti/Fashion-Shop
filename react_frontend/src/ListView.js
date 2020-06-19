import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ListView.css';
import data from './dummyData.json';

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
            <img
                class="itemimage"
                src={this.props.url}
                alt={"Image of " + this.props.alt}
            ></img>
        );
    }
}

class ItemCard extends React.Component {
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
                url={this.props.itemData.item_images}
                alt={this.props.itemData.item_name}
            />
        );
    }

    render() {
        return (
            <div class="itemcard">
                <a href={this.props.itemData.item_url}>
                    {this.renderItemImage()}
                    {this.renderItemInfo()}
                </a>
            </div>
        );
    }
}

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
        return <Grid fluid><Col around="xs"><Row around="xs">{this.listItems}</Row></Col></Grid>;
    }
}
