import Axios from "axios"

export default (token) => {
    if (token) {
        Axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete Axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
}