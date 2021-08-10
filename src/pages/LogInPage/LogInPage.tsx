import React from 'react'
import LogIn from '../../components/LogIn/LogIn'

const LogInPage = (props) => {
    const {notify, setNotify} = props
    return (
        <div>
            <LogIn notify={notify} setNotify={setNotify}/>
        </div>
    )
}

export default LogInPage
