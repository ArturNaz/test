import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

class ResultAnimation extends Component {
    componentDidMount() {


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       // this.animation.play(0,200)
    }

    render() {
        const {result} = this.props;
        if (result === null)
            return null;
        if (result) {
            return (
                <LottieView
                    loop={false}
                    autoPlay
                    colorFilterForLayer={{ layer: 'some_layer', colorFilter: '#bae' }}
                    style={styles.layer}
                    ref={(animation) => {
                        this.animation = animation;
                    }}
                    source={require('../assets/animation/29671-check-mark')}
                />
            );
        } else {
            return (<LottieView
                loop={false}
                autoPlay
                colorFilterForLayer={[{ layer: 'some_layer', colorFilter: '#bae' }]}
                style={styles.layer}
                ref={(animation) => {
                    this.animation = animation;
                }}
                source={require('../assets/animation/lf30_editor_GewO5x')}
            />)
        }

    }
}

ResultAnimation.defaultProps = {
    result: null,
};

export default ResultAnimation;

const styles = StyleSheet.create({
    layer: {
        position: 'absolute',
        elevation: 2,
        height: 50,
        aspectRatio: 1,
        right: 0
    },

});
