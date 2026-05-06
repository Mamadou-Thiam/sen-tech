import api from './api';

export const getEnrollments = () => api.get('/enrollments');
export const getMyEnrollments = () => api.get('/enrollments/my-enrollments');
export const createEnrollment = (data) => api.post('/enrollments', data);
export const extendEnrollment = (id, days) => api.put(`/enrollments/extend/${id}`, { days });
export const deleteEnrollment = (id) => api.delete(`/enrollments/${id}`);
