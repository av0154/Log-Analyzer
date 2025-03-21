import React from "react";

const logs = [
  {
    ip: "192.9.57.89",
    timestamp: "3/13/2025, 6:36:30 PM",
    accessType: "File Access",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102",
    status: 200,
    flagged: false,
  },
  {
    ip: "30.216.75.83",
    timestamp: "3/13/2025, 6:24:30 PM",
    accessType: "System Command Execution",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102",
    status: 401,
    flagged: true,
  },
];

const UnauthorizedAccessTable = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Unauthorized Access Logs</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Access Type</th>
            <th className="px-4 py-2">User Agent</th>
            <th className="px-4 py-2">HTTP Status</th>
            <th className="px-4 py-2">Flagged</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{log.ip}</td>
              <td className="px-4 py-2">{log.timestamp}</td>
              <td className="px-4 py-2">{log.accessType}</td>
              <td className="px-4 py-2">{log.userAgent}</td>
              <td className="px-4 py-2">{log.status}</td>
              <td className="px-4 py-2">
                {log.flagged ? (
                  <span className="text-red-500 font-bold"> Yes</span>
                ) : (
                  <span className="text-green-500 font-bold"> No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnauthorizedAccessTable;
