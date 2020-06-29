import React from 'react';

import './css/ItemPage.css';

export default class ItemPage extends React.Component {
    constructor(props){
        super(props);
        this.images = []
        for (let i = 0; i < props.itemData.item_images.length; i++) {
            this.images.push(
                <div>
                    <div data-src={props.itemData.item_images[i]} />
                    <img draggable="false"
                        src={props.itemData.item_images[i]}
                        alt={props.itemData.item_name}
                        key={props.itemData.item_images[i]}
                    ></img>
                </div>
            )
        }
    }
    
    render(){
        return(
            <div>
                <p>{this.props.itemData.item_name}</p>
                <p>{this.props.itemData.item_vendor}</p>
                <p>{this.props.itemData.item_price}</p>
                {this.images}
                <p>{this.props.itemData.item_url}</p>
            </div>
        );
    }
}