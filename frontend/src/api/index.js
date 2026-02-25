import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
})

export const fetchAssignments = (difficulty) =>
    api.get('/assignments', { params: difficulty ? { difficulty } : {} })

export const fetchAssignment = (id) =>
    api.get(`/assignments/${id}`)

export const executeSQL = (sql) =>
    api.post('/execute', { sql })

export const getHint = (assignmentId, currentQuery) =>
    api.post('/hints', { assignmentId, currentQuery })

export const saveAttempt = (data) =>
    api.post('/attempts', data)
