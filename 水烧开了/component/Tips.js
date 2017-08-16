import React from 'react'

const Tips = (props) => {
    return (
        <div>
            {props.tip ? '水烧开了' : '水没烧开'}
        </div>
    )
}

Tips.propTypes = {
    tip: React.PropTypes.bool.isRequired
}

export default Tips