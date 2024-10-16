// api/hotel.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Hardcoded hotel data
const hotels = [
    {
        id: 101,
        name: "Some Hotel Inn",
        city: "Pune",
        country: "India"
    },
    {
        id: 102,
        name: "Luxury Stay",
        city: "Mumbai",
        country: "India"
    },
    {
        id: 103,
        name: "Budget Lodge",
        city: "Bangalore",
        country: "India"
    }
];

// Middleware to check for authentication
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
};

// Get hotel details by ID
router.get('/getHotel/:id', authenticate, (req, res) => {
    const hotelId = parseInt(req.params.id);
    
    // Find the hotel by ID
    const hotel = hotels.find(h => h.id === hotelId);
    
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    const response = {
        "Hotel Name": hotel.name,
        "City": hotel.city,
        "Country": hotel.country
    };

    res.status(200).json(response);
});

export default router;
