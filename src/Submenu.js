import React from 'react';

const Submenu = (props) => {
    let items = props.items.map((e, i) => (
        <li key={i}>{e}</li>
    ))
    return (
        <ul className='submenu'>
            {items}

        </ul>
    );
}

export default Submenu;