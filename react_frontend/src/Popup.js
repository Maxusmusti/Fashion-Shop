import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Button from '@material-ui/core/Button';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.images = []
        for (let i = 0; i < props.itemData.item_images.length; i++) {
            this.images.push(
                <img draggable="false"
                    class="thumbnail"
                    src={props.itemData.item_images[i]}
                    alt={props.itemData.item_name}
                ></img>
            )
        }
    }

    render() {
        return (
            <div class='popup'>
                <OutsideAlerter closePopup={this.props.closePopup.bind(this)}>
                    <div class='popup_inner'>
                        <div class="scroll">
                            <h1 style={{ padding: '2px', margin: 0 }}>{this.props.itemData.item_name}</h1>
                            <p class="popup_vendor">{this.props.itemData.item_vendor}</p>
                            <p class="popup_price">{this.props.itemData.item_price}</p>
                            <Button variant="outlined" color="primary" href={this.props.itemData.item_url}>
                                See in store
                            </Button>
                            <Carousel class="carousel">
                                {this.images}
                            </Carousel>
                        </div>
                        
                    </div>
                </OutsideAlerter>
            </div>
        );
    }
}




class OutsideAlerter extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.closePopup();
        }
    }

    render() {
        return <div ref={this.setWrapperRef}>{this.props.children}</div>;
    }
}

OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
};