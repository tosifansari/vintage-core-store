// backend/controllers/authController.js

// 🚀 1. Mock registration logic
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        res.status(201).json({
            _id: 'mock_user_101',
            name: name,
            email: email,
            isAdmin: false,
            token: 'mock_jsonwebtoken_matrix_payload'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🚀 2. Mock login logic
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        res.status(200).json({
            _id: 'mock_user_101',
            name: 'tosif',
            email: email,
            isAdmin: false,
            token: 'mock_jsonwebtoken_matrix_payload'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🚀 3. Mock Get User Profile Logic
const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            _id: 'mock_user_101',
            name: 'tosif',
            email: 'worldwarz9953@gmail.com',
            isAdmin: false
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🚀 4. Mock Update User Profile Logic
const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        res.status(200).json({
            _id: 'mock_user_101',
            name: name || 'tosif',
            email: email || 'worldwarz9953@gmail.com',
            isAdmin: false,
            token: 'mock_jsonwebtoken_matrix_payload'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Single unified module exports block
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};