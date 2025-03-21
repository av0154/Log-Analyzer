import React, { useEffect, useState } from "react";
import "./styles.css";

const SQLInjectionTable = () => {
    const [sqlLogs, setSqlLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/sql-injection-logs") // Update with correct API endpoint
            .then(response => response.json())
            .then(data => setSqlLogs(data))
            .catch(error => console.error("Error fetching SQL logs:", error));
    }, []);

    return (
        <div className="log-table">
            <h2>SQL Injection Logs</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IP Address</th>
                        <th>Query</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sqlLogs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.id}</td>
                            <td>{log.ip}</td>
                            <td className="sql-query">{log.query}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td className={log.status === "Blocked" ? "blocked" : "allowed"}>
                                {log.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SQLInjectionTable;
