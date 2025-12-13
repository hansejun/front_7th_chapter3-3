import axios from 'axios';

// 환경에 따라 다른 baseURL 사용
// 개발: /api (프록시 사용)
// 프로덕션: https://dummyjson.com (직접 호출)
const baseURL = import.meta.env.PROD ? 'https://dummyjson.com' : '/api';

// Axios 인스턴스 생성
export const apiInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});