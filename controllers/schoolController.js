const db = require('../models/db');

// Haversine formula to calculate distance between two points on Earth
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// Add a new school
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO school (name, address, latitute, longitute) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding school.' });
        }
        res.status(201).json({ message: 'School added successfully.' });
    });
};

// List all schools sorted by proximity
const listSchools = (req, res) => {
    const { latitute, longitute } = req.query;

    if (!latitute || !longitute) {
        return res.status(400).json({ message: 'User coordinates are required.' });
    }

    const query = 'SELECT id, name, address, latitute, longitute FROM school';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error retrieving schools.' });
        }

        const userLat = parseFloat(latitute);
        const userLon = parseFloat(longitute);

        // Calculate distance and sort schools
        const sortedSchools = results.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitute, school.longitute)
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};

module.exports = { addSchool, listSchools };
