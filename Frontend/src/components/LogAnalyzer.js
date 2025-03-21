import React, { useState, useEffect } from "react";

const LogAnalyzer = () => {
    const [unauthorizedLogs, setUnauthorizedLogs] = useState([]);
    const [sqlLogs, setSqlLogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUnauthorizedLogs();
        fetchSQLLogs();
    }, []);

    const fetchUnauthorizedLogs = () => {
        fetch("http://localhost:5000/api/unauthorized-access")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Unauthorized Access Logs:", data);
                setUnauthorizedLogs(data); // Update state
                window.unauthorizedLogs = data; // Debugging
            })
            .catch(error => {
                console.error("Failed to fetch unauthorized access logs:", error);
                setError("Failed to load unauthorized logs.");
            });
    };

    const fetchSQLLogs = () => {
        fetch("http://localhost:5000/api/sql-logs")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched SQL Injection Logs:", data);
                setSqlLogs(data); // Update state
                window.sqlLogs = data; // Debugging
            })
            .catch(error => {
                console.error("Failed to fetch SQL injection logs:", error);
                setError("Failed to load SQL logs.");
            });
    };

    return (
        <div>
            <h2>Unauthorized Access Logs</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Source IP</th>
                        <th>Destination IP</th>
                        <th>Access Type</th>
                        <th>User Agent</th>
                        <th>HTTP Status</th>
                    </tr>
                </thead>
                <tbody>
                    {unauthorizedLogs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.source_ip}</td>
                            <td>{log.destination_ip}</td>
                            <td>{log.access_type}</td>
                            <td>{log.user_agent}</td>
                            <td>{log.http_status_code_response ? log.http_status_code_response : "Unknown"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>SQL Injection Logs</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Source IP</th>
                        <th>Destination IP</th>
                        <th>SQL Query</th>
                        <th>User Agent</th>
                        <th>HTTP Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sqlLogs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.source_ip}</td>
                            <td>{log.destination_ip}</td>
                            <td>{log.sql_query}</td>
                            <td>{log.user_agent}</td>
                            <td>{log.http_status_code_response ? log.http_status_code_response : "N/A"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogAnalyzer;
