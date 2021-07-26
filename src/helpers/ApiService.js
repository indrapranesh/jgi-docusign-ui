import Axios from "axios";
import { setLoading } from "../redux/actions/common-actions";
import store from '../redux/store/index';
export class APIService {

    static async makeRequest(url, path, options) {
        store.dispatch(setLoading(true));
        return new Promise(async (resolve, reject) => {
            try {
                console.log(url);
                const axiosApiInstance = Axios.create();
                axiosApiInstance.interceptors.request.use(
                    config => {
                        const token = localStorage.getItem('ACCESS_TOKEN');
                        if (token) {
                            config.headers['Authorization'] = 'Bearer ' + token;
                        }
                        return config;
                    },
                    error => {
                        Promise.reject(error)
                    });
                axiosApiInstance.interceptors.response.use((response) => {
                    return response
                    }, async function (error) {
                    const originalRequest = error.config;
                    console.log(error);
                    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
                        originalRequest._retry = true;
                        localStorage.clear();
                        window.location.reload();
                    }
                    return Promise.reject(error);
                    });
                options.url = `${url}${path}`;
                const result = (await axiosApiInstance.request(options)).data;
                store.dispatch(setLoading(false));
                resolve(result);
            } catch (err) {
                store.dispatch(setLoading(false));
                console.log(err);
                reject(err)
            }
        })
    }

    static async get(url, path) {
        const config = {
            method: 'GET'
        }
        return this.makeRequest(url, path, config)
    }
    static async post(url, path, body) {
        const config = {
            method: 'POST',
            data: body
        }
        return this.makeRequest(url, path, config)
    }
    static async put(url, path, body) {
        const config = {
            method: 'PUT',
            data: body
        }
        return this.makeRequest(url, path, config)
    }
    static async patch(url, path, body) {
        const config = {
            method: 'PATCH',
            data: body
        }
        return this.makeRequest(url, path, config)
    }
    static async delete(url, path, body) {
        const config = {
            method: 'DELETE',
            data: body
        }
        return this.makeRequest(url, path, config)
    }
}