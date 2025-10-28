import axios from 'axios';

export const BookbaseURL = axios.create({
    baseURL: 'http://localhost:8000/book',
});