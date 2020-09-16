import React, {Component} from 'react';
import {StyleSheet, Image, Animated, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
class FullScreenImage extends Component {
    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.animation.play(0,200)
    }

    render() {

        return (
            <Animated.View style={styles.overlay} onLayout={(e => console.log(e))}>

                <Image
                    {...this.props}
                />
            </Animated.View>
        )
    }
}

FullScreenImage.defaultProps = {};

export default FullScreenImage;

const styles = StyleSheet.create({
    overlay: {
        top:0,
        left:0,
        width,
        height,
        position: 'absolute',
        backgroundColor:'black',
        justifyContent:'center',
        elevation:4,
        zIndex:4,

    },

});
