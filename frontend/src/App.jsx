import { Routes, Route } from 'react-router-dom'
import AssignmentListPage from './pages/AssignmentListPage/AssignmentListPage'
import AssignmentAttemptPage from './pages/AssignmentAttemptPage/AssignmentAttemptPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AssignmentListPage />} />
      <Route path="/assignment/:id" element={<AssignmentAttemptPage />} />
    </Routes>
  )
}

export default App
