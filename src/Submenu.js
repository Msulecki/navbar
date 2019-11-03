import React from 'react'
import { Link } from 'react-router-dom'

const Submenu = (props) => {
    let items = props.items.map((e, i) => (
        <li className='submenu__item' key={i}><Link to={e}>{e}</Link></li>
    ))

    return (
        <>
            <ul className='submenu'>
                {items}
            </ul>
        </>
    )
}

export default Submenu