import React from 'react';
import OneStar from './OneStar';
import TwoStar from './TwoStar';
import ThreeStar from './ThreeStar';
import FourStar from './FourStar';
import FiveStar from './FiveStar';

const Stars = (props) => {
    if(props.rating === "1" || props.rating === 1)
    return (
        <OneStar />
    );
    else if(props.rating === "2" || props.rating === 2)
    return (
        <TwoStar />
    );
    else if(props.rating === "3" || props.rating === 3)
    return (
        <ThreeStar />
    );
    else if(props.rating === "4" || props.rating === 4)
    return (
        <FourStar />
    );
    else if(props.rating === "5" || props.rating === 5)
    return (
        <FiveStar />
    );
    else {
        return (null)
    }
}

export default Stars;
