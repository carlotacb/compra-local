import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export function Stars(props) {

    function renderStars(values) {
        var output = [];
        for(var v in values) {
            if (values[v] === 0){
                output.push(<StarBorderIcon />)
            }
            else if (values[v] === 1) {
                output.push(<StarIcon /> )
            }
            else {
                output.push(<StarHalfIcon/>)
            }
        }
        return output;
    }
    var value = props.value;
    var stars = [0,0,0,0,0]
    var i = 0
    while(value > 0 && i < 5){
        if(value - 1 >= 0){
            stars[i] = 1;
            value = value - 1; 
        }
        else if (value - 0.5 >= 0) {
            stars[i] = 0.5;
            value = value - 0.5;
        }
        i += 1
    }
    return renderStars(stars);
}