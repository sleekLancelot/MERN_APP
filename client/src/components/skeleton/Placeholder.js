import React from 'react'

const Placeholder = () => {
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                <p className='loading' style={{ width: '250px', height: '10px', borderRadius: '10px' }}></p>
                <span
                    style={{ float: 'right', width: '100px', height: '10px', marginTop: '-10px' }}
                    className='badge loading'>
                </span>
            </h3>
            <ul className='list'>
                <li style={{ display: 'flex' }}>
                    <i className='fas fa-envelope-open' style={{ margin: '10px' }} />
                    <p className='loading' style={{ width: '150px', height: '10px', margin: '10px', borderRadius: '10px' }}></p>
                </li>
                <li style={{ display: 'flex' }}>
                    <i className='fas fa-phone' style={{ margin: '10px' }} />
                    <p className='loading' style={{ width: '100px', height: '10px', margin: '10px', borderRadius: '10px' }}></p>
                </li>
            </ul>
            <p>
                <button className='btn btn-dark btn-sm'> Edit </button>
                <button className='btn btn-danger btn-sm'> Delete </button>
            </p>
        </div>
    )
}

export default Placeholder;
