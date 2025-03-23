import axios from 'axios';

const ENDPOINT = '/users';
const HOST = process.env.VUE_APP_API_HOST;


class UserService {

    getAuthHeaders() {
        const token = localStorage.getItem('token');
        console.log(token)
        return {
            Authorization: `Bearer ${token}`
        };
    }

    getUsers() {
        return axios.get(`${HOST}${ENDPOINT}`, {
            headers: this.getAuthHeaders()
        })
    }

    updateUserStatus(userId, status) {
        return axios.patch(`${HOST}${ENDPOINT}/${userId}/status`, { status }, {
            headers: this.getAuthHeaders()
        });
    }
    
    createUser(user){
        return axios.post(`${HOST}${ENDPOINT}`, user, {
            headers: this.getAuthHeaders()
        });
    }

}

export default new UserService();