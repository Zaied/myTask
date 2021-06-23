import * as Cookies from 'js-cookie'

export const setToken = (token) =>{
    Cookies.set('token',token);
}

export const getToken = () =>{
    const token = Cookies.get('token');
    return token;
}


export const removeToken = () =>{
    Cookies.remove('token')
}
