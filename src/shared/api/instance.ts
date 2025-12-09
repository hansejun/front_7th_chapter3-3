import axios from 'axios';

// Axios 인스턴스 생성
export const apiInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});