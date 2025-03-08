const db = require("../db");

// Function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Add School API
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ message: "School added successfully", id: result.insertId });
  });
};

// List Schools API
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "User location is required" });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    
    const schools = results.map((school) => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(schools);
  });
};
