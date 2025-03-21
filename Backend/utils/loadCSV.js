const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const LogSQL = require('../models/LogSQL');
const UnauthorizedAccess = require('../models/UnauthorizedAccess');

// Define dataset paths
const sqlInjectionDatasetPath = path.join(__dirname, '../dataset/sql_injection_dataset.csv');
const unauthorizedAccessDatasetPath = path.join(__dirname, '../dataset/unauthorized_access_dataset.csv');

// Function to load CSV data into MongoDB
const loadCSVData = async () => {
    try {
        console.log(' Loading SQL Injection Dataset...');
        await loadSQLLogs();
        
        console.log(' Loading Unauthorized Access Dataset...');
        await loadUnauthorizedAccessLogs();

        console.log(' CSV Data Successfully Loaded.');
    } catch (error) {
        console.error(' Error loading CSV data:', error);
    }
};

// Function to read and insert SQL Injection Logs
const loadSQLLogs = async () => {
    return new Promise((resolve, reject) => {
        const logs = [];

        fs.createReadStream(sqlInjectionDatasetPath)
            .pipe(csv())
            .on('data', (row) => logs.push(row))
            .on('end', async () => {
                await LogSQL.insertMany(logs);
                console.log(` ${logs.length} SQL Injection logs inserted.`);
                resolve();
            })
            .on('error', (err) => reject(err));
    });
};

// Function to read and insert Unauthorized Access Logs
const loadUnauthorizedAccessLogs = async () => {
    return new Promise((resolve, reject) => {
        const logs = [];

        fs.createReadStream(unauthorizedAccessDatasetPath)
            .pipe(csv())
            .on('data', (row) => logs.push(row))
            .on('end', async () => {
                await UnauthorizedAccess.insertMany(logs);
                console.log(` ${logs.length} Unauthorized Access logs inserted.`);
                resolve();
            })
            .on('error', (err) => reject(err));
    });
};

module.exports = { loadCSVData };
