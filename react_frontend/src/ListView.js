import React from 'react';
import { Trail } from 'react-spring/renderprops'
import { Redirect } from 'react-router';

import Popup from './Popup';

import './css/ListView.css';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
        for (let i = 0; i < this.props.data.length; i++) {
            this.state.listItems.push(
                <ItemCard
                    itemData={this.props.data[i]}
                    key={JSON.stringify(this.props.data[i])}
                />
            )
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.listItems) {
            const data = nextProps.data;
            const newListItems = [];
            for (let i = 0; i < data.length; i++) {
                newListItems.push(
                    <ItemCard
                        itemData={data[i]}
                        key={JSON.stringify(data[i])}
                    />
                )
            }

            return {
                listItems: newListItems
            }
        }
        return null;
    }

    render() {
        return (
            <div className="ListView">
                <Trail
                    config={{ tension: 400, friction: 30, precision: 0.1 }}
                    items={this.state.listItems}
                    keys={item => item.key}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}>
                    {item => props => <span style={props}>{item}</span>}
                </Trail>
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
                <a href={"/" + this.props.itemData.item_name + this.props.itemData.item_vendor}>
                    <div className="itemcard">
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
                </a>
            </div >
        );
    }


    /*
        return (
            <div ref="myElement">
                <div
                    className="itemcard"
                    onClick={}
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
    */
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