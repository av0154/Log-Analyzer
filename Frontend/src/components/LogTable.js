import { useState, useEffect } from "react";
import "../styles.css"; //  Correct path from `components/`

// Ensure styles are included

const LogTable = () => {
    const [unauthorizedLogs, setUnauthorizedLogs] = useState([]);
    const [sqlLogs, setSQLLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Unauthorized Access Logs
        fetch("http://localhost:5000/api/unauthorized-access")
            .then((response) => response.json())
            .then((data) => setUnauthorizedLogs(data))
            .catch((error) => console.error("Error fetching unauthorized logs:", error));

        // Fetch SQL Injection Logs
        fetch("http://localhost:5000/api/sql-logs")
            .then((response) => response.json())
            .then((data) => setSQLLogs(data))
            .catch((error) => console.error("Error fetching SQL logs:", error));

        setLoading(false);
    }, []);

    return (
        <div className="log-container">
            <h2> Security Log Analysis</h2>

            {loading ? <p>Loading logs...</p> : (
                <>
                    {/*  Unauthorized Access Logs Table */}
                    <h3> Unauthorized Access Logs</h3>
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th>IP Address</th>
                                <th>Timestamp</th>
                                <th>Access Type</th>
                                <th>User Agent</th>
                                <th>HTTP Status</th>
                                <th>Flagged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unauthorizedLogs.map((log) => (
                                <tr key={log._id}>
                                    <td>{log.source_ip || "Unknown IP"}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>{log.access_type}</td>
                                    <td>{log.user_agent}</td>
                                    <td>{log.http_status_code_response}</td>
                                    <td className={log.flagged ? "flagged" : "safe"}>
                                        {log.flagged ? " Yes" : " No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/*  SQL Injection Logs Table */}
                    <h3> SQL Injection Logs</h3>
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th>IP Address</th>
                                <th>Timestamp</th>
                                <th>SQL Query</th>
                                <th>User Agent</th>
                                <th>HTTP Status</th>
                                <th>Flagged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sqlLogs.map((log) => (
                                <tr key={log._id}>
                                    <td>{log.source_ip || "Unknown IP"}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>{log.sql_query}</td>
                                    <td>{log.user_agent}</td>
                                    <td>{log.http_status_code_response}</td>
                                    <td className={log.flagged ? "flagged" : "safe"}>
                                        {log.flagged ? " Yes" : " No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default LogTable;
