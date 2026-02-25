import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { fetchAssignment, executeSQL, getHint, saveAttempt } from '../../api'
import './AssignmentAttemptPage.scss'

export default function AssignmentAttemptPage() {
    const { id } = useParams()
    const [assignment, setAssignment] = useState(null)
    const [loadError, setLoadError] = useState(null)
    const [sql, setSql] = useState('SELECT * FROM employees LIMIT 5;')
    const [results, setResults] = useState(null)
    const [execError, setExecError] = useState(null)
    const [executing, setExecuting] = useState(false)
    const [hint, setHint] = useState(null)
    const [hintLoading, setHintLoading] = useState(false)

    useEffect(() => {
        fetchAssignment(id)
            .then((res) => setAssignment(res.data))
            .catch(() => setLoadError('Could not load assignment. Is the backend running?'))
    }, [id])

    const handleExecute = useCallback(async () => {
        setExecuting(true)
        setExecError(null)
        setResults(null)
        try {
            const res = await executeSQL(sql)
            setResults(res.data)
            saveAttempt({ assignmentId: id, sql, success: true, rowCount: res.data.rowCount }).catch(() => { })
        } catch (err) {
            const msg = err.response?.data?.error || 'Query execution failed.'
            setExecError(msg)
            saveAttempt({ assignmentId: id, sql, success: false, errorMessage: msg }).catch(() => { })
        } finally {
            setExecuting(false)
        }
    }, [sql, id])

    const handleHint = useCallback(async () => {
        setHintLoading(true)
        setHint(null)
        try {
            const res = await getHint(id, sql)
            setHint(res.data.hint)
        } catch {
            setHint('Could not fetch a hint right now. Check your GEMINI_API_KEY.')
        } finally {
            setHintLoading(false)
        }
    }, [id, sql])

    const handleEditorMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, handleExecute)
    }

    if (loadError) return <p className="attempt-page__status attempt-page__status--error">{loadError}</p>
    if (!assignment) return <p className="attempt-page__status">Loading assignment...</p>

    const { title, difficulty, description, tableData } = assignment

    return (
        <div className="attempt-page">
            <aside className="attempt-page__left">
                <Link to="/" className="attempt-page__back">← All Assignments</Link>

                <span className={`attempt-page__badge attempt-page__badge--${difficulty.toLowerCase()}`}>
                    {difficulty}
                </span>
                <h1 className="attempt-page__title">{title}</h1>
                <p className="attempt-page__desc">{description}</p>

                {tableData && tableData.columns.length > 0 && (
                    <div className="data-viewer">
                        <h3 className="data-viewer__heading">Sample Data</h3>
                        <div className="data-viewer__scroll">
                            <table className="data-viewer__table">
                                <thead>
                                    <tr>{tableData.columns.map((col) => <th key={col}>{col}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {tableData.rows.map((row, i) => (
                                        <tr key={i}>
                                            {tableData.columns.map((col) => <td key={col}>{String(row[col] ?? '')}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </aside>

            <main className="attempt-page__right">
                <div className="attempt-page__editor-wrap">
                    <Editor
                        height="220px"
                        language="sql"
                        theme="vs-dark"
                        value={sql}
                        onChange={(val) => setSql(val || '')}
                        onMount={handleEditorMount}
                        options={{
                            fontSize: 14,
                            fontFamily: 'JetBrains Mono, monospace',
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            padding: { top: 12, bottom: 12 },
                        }}
                    />
                </div>

                <div className="attempt-page__actions">
                    <button className="btn btn--primary" onClick={handleExecute} disabled={executing}>
                        {executing ? 'Running...' : '▶ Execute'}
                    </button>
                    <button className="btn btn--secondary" onClick={handleHint} disabled={hintLoading}>
                        {hintLoading ? 'Thinking...' : '💡 Get Hint'}
                    </button>
                    <span className="attempt-page__shortcut">Ctrl+Enter to run</span>
                </div>

                {execError && (
                    <div className="attempt-page__exec-error">
                        <span className="attempt-page__exec-error-label">Error</span>
                        {execError}
                    </div>
                )}

                {hint && (
                    <div className="attempt-page__hint">
                        <span className="attempt-page__hint-label">💡 Hint</span>
                        <p>{hint}</p>
                    </div>
                )}

                {results && (
                    <div className="results-table">
                        <p className="results-table__meta">{results.rowCount} row(s) returned</p>
                        <div className="results-table__scroll">
                            <table className="results-table__table">
                                <thead>
                                    <tr>{results.columns.map((c) => <th key={c}>{c}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {results.rows.map((row, i) => (
                                        <tr key={i}>
                                            {results.columns.map((c) => <td key={c}>{String(row[c] ?? '')}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
