import React from 'react'
import Register from '../../components/Register/Register'

const RegisterPage = (props) => {
    const {notify, setNotify} = props;
    return (
        <div>
            <Register notify={notify} setNotify={setNotify}/>
        </div>
    )
}

export default RegisterPage
