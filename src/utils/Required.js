import Cookies from 'js-cookie'
import {Navigate,Outlet} from 'react-router-dom'


export const Required =()=>{
    const token = Cookies.get('jwt')
    return(
        token
        ?<Outlet />
        :<Navigate to='/' />
    )
}

export const LoginAuth=()=>{
    const token = Cookies.get('jwt')
    return(
        token
        ?<Navigate to='/dashboard' />
        :<Outlet />
    )
}