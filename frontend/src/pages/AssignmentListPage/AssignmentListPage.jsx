import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAssignments } from '../../api'
import './AssignmentListPage.scss'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']

export default function AssignmentListPage() {
    console.log('API BASE:', import.meta.env.VITE_API_BASE_URL)
    const [assignments, setAssignments] = useState([])
    const [filter, setFilter] = useState('All')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const difficulty = filter === 'All' ? null : filter
        setLoading(true)
        setError(null)
        fetchAssignments(difficulty)
            .then((res) => setAssignments(res.data))
            .catch(() => setError('Failed to load assignments. Is the backend running?'))
            .finally(() => setLoading(false))
    }, [filter])

    return (
        <main className="assignment-list-page">
            <header className="assignment-list-page__header">
                <h1 className="assignment-list-page__title">CipherSQL Studio</h1>
                <p className="assignment-list-page__subtitle">Sharpen your SQL skills with real datasets</p>
            </header>

            <div className="assignment-list-page__filters">
                {DIFFICULTIES.map((d) => (
                    <button
                        key={d}
                        className={`filter-btn${filter === d ? ' filter-btn--active' : ''}`}
                        onClick={() => setFilter(d)}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {loading && <p className="assignment-list-page__status">Loading assignments...</p>}
            {error && <p className="assignment-list-page__error">{error}</p>}

            {!loading && !error && (
                <div className="assignment-list-page__grid">
                    {assignments.map((a) => (
                        <article
                            key={a.id}
                            className={`assignment-card assignment-card--${a.difficulty.toLowerCase()}`}
                            onClick={() => navigate(`/assignment/${a.id}`)}
                        >
                            <span className="assignment-card__badge">{a.difficulty}</span>
                            <h2 className="assignment-card__title">{a.title}</h2>
                            <p className="assignment-card__desc">{a.description}</p>
                            <span className="assignment-card__cta">Start challenge →</span>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}
