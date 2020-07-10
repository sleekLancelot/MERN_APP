import React, { Fragment, useEffect, useState } from 'react';
import Placeholder from './Placeholder'

const Skeleton = ({
    condition,
    multiplier,
    checkOnce,
    initialDelay,
    children
}) => {
    let [checked, isChecked] = useState(false);
    let [component, setComponent] = useState([]);

    useEffect(() => {
        if (checkOnce && checked) {
            return setComponent([children]);
        }

        let delay = initialDelay || 0;

        if (condition) {
            if (initialDelay) {
                let timer = setTimeout(() => {
                    setComponent([children]);
                }, delay)
                clearTimeout(timer);
            } else {
                setComponent([children]);
            }
            isChecked(true);
        } else {
            let mx = multiplier || 1;
            let placeComp = [], i;
            for (i = 0; i < mx; i++) {
                placeComp.push(<Placeholder key={i} />)
            }
            setComponent(placeComp);
        }
        // return () => {
        //     cleanup
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [condition, children])

    return (
        <Fragment>
            {
                component.map((component, index) => <Fragment key={index}>{component}</Fragment>)
            }
        </Fragment>
    )
}

export default Skeleton;
