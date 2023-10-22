import axios from 'axios';
import Config from '../Config/Config';
import { axiosInstanceWithAuth } from "./Config";

const API_BASE_URL = Config.API_BASE_URL;

export const GetApiCall = async (url) => {
    try {
        const response = await axiosInstanceWithAuth.get(`${API_BASE_URL+url}`);
        return response.data.data;
    } catch (error) {
        console.log(error.response.data.error.message);
        alert (error.response.data.error.message);
    }
};

export const PostApiCall = async (url,data) => {

    try {
        const response = await axiosInstanceWithAuth.post(`${API_BASE_URL+url}`,data);
        return response.data;
    } catch (error) {
        console.log(error.response.data.error.message);
        alert (error.response.data.error.message);
    }
};
