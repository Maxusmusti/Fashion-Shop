import React, { Component } from "react";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Transition, config } from 'react-spring/renderprops'

import './Scroll.css';

export default class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }

    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (!this.state.is_visible && window.pageYOffset > window.innerHeight / 2) {
            this.setState({
                is_visible: true
            });
        } else if (this.state.is_visible && window.pageYOffset <= window.innerHeight / 2) {
            this.setState({
                is_visible: false
            });
            document.body.style.overflow = "scroll";
        }
    }

    scrollUP = () => {
        document.body.style.overflow = "hidden";
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    render() {
        const show = this.state.is_visible;
        const buttonWidth = 25;
        const buttonMargin = 30;
        const start = buttonMargin + buttonWidth / 2;

        return (
            <div>
                <ProgressBar />
                <Transition config={config.gentle}
                    items={show}
                    from={{ opacity: 1, width: '0px', height: '0px', bottom: start + 'px', right: start + 'px' }}
                    enter={{ opacity: 1, width: buttonWidth + 'px', height: buttonWidth + 'px', bottom: buttonMargin + 'px', right: buttonMargin + 'px' }}
                    leave={{ opacity: 0, width: '0px', height: '0px', bottom: start + 'px', right: start + 'px' }}
                >
                    {show => show && (props =>
                        <ArrowUpwardIcon className="scrolltotop" style={props} onClick={this.scrollUP} />
                    )}
                </Transition>
            </div>
        );
    }
}

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        window.onload = function () { updateBar() };
        window.onscroll = function () { updateBar() };
        function updateBar() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("bar").style.width = scrolled + "%";
        }
    }

    render() {
        return (
            <div className="progress-container">
                <div className="progress-bar" id="bar"></div>
            </div>
        );
    }
}
