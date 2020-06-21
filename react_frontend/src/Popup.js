import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Close from '@material-ui/icons/Close';
//import Button from '@material-ui/core/Button';
import { Transition } from 'react-spring/renderprops'
import * as easings from 'd3-ease'

import './Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.images = []
        for (let i = 0; i < props.itemData.item_images.length; i++) {
            this.images.push(
                <img draggable="false"
                    className="thumbnail"
                    src={props.itemData.item_images[i]}
                    alt={props.itemData.item_name}
                    key={props.itemData.item_images[i]}
                ></img>
            )
        }
    }

    render() {
        const show = this.props.showPopup;
        const itemCardRect = this.props.itemCardBoundingRect;
        const startTop = itemCardRect ? 100 * itemCardRect.top / window.innerHeight + '%' : '0%';
        const startBottom = itemCardRect ? 100 * (1 - itemCardRect.bottom / window.innerHeight) + '%' : '0%';
        const startLeft = itemCardRect ? 100 * itemCardRect.left / window.innerWidth + '%' : '0%';
        const startRight = itemCardRect ? 100 * (1 - itemCardRect.right / window.innerWidth) + '%' : '0%';

        return (
            <Transition config={{ duration: 200, easing: easings.easeCubic }}
                items={show}
                from={{ opacity: 1, left: startLeft, right: startRight, top: startTop, bottom: startBottom }}
                enter={{ opacity: 1, left: '30%', right: '30%', top: '5%', bottom: '5%' }}
                leave={{ opacity: 1, left: '30%', right: '30%', top: '100%', bottom: '-90%', fontSize: 0 }}
                unique='true'
            >
                {show => show && (props =>
                    <div className='popup'>
                        <OutsideAlerter closePopup={this.props.closePopup.bind(this)}>
                            <div className='popup_inner' style={props}>
                                <Close onClick={this.props.closePopup} className="closebutton" />
                                <div className="scroll">

                                    <Transition config={{ tension: 450, friction: 40 }}
                                        items={show}
                                        from={{ fontSize: 0 }} enter={{ fontSize: 20 }} leave={{ fontSize: 0 }}
                                    >
                                        {show => show && (props =>
                                            <p className="popup_name" style={props}>{this.props.itemData.item_name}</p>
                                        )}
                                    </Transition>

                                    <Transition config={{ tension: 450, friction: 40 }}
                                        items={show}
                                        from={{ fontSize: 0 }} enter={{ fontSize: 16 }} leave={{ fontSize: 0 }}
                                    >
                                        {show => show && (props =>
                                            <p className="popup_vendor" style={props}>{this.props.itemData.item_vendor}</p>
                                        )}
                                    </Transition>

                                    <Transition config={{ tension: 450, friction: 40 }}
                                        items={show}
                                        from={{ fontSize: 0 }} enter={{ fontSize: 16 }} leave={{ fontSize: 0 }}
                                    >
                                        {show => show && (props =>
                                            <p className="popup_price" style={props}>{this.props.itemData.item_price}</p>
                                        )}
                                    </Transition>

                                    <Carousel className="carousel">
                                        {this.images}
                                    </Carousel>

                                </div>
                            </div>
                        </OutsideAlerter>
                    </div>
                )}
            </Transition>
        );
    }
}

/*
<Button variant="outlined" href={this.props.itemData.item_url}>
                                        See in store
                                    </Button>
*/


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