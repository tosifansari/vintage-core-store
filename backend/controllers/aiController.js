// controllers/aiController.js
const Product = require('../models/Product');

// @desc    Get AI-driven product recommendations based on user natural language prompt
// @route   POST /api/ai/recommend
const getAIRecommendations = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Please provide a search prompt for the AI' });
    }

    try {
        // 1. Fetch all available items from our MongoDB Catalog
        const products = await Product.find({});
        
        // Product data ko compact string formats mein convert kar rahe hain taaki LLM tokens bach sakein
        const productCatalogString = products.map(p => 
            `ID: ${p._id}, Name: ${p.name}, Category: ${p.category}, Price: INR ${p.price}, Description: ${p.description}`
        ).join('\n');

        // 2. Groq Cloud / Llama 3 API Endpoint hitting logic
        // Local testing ke liye dynamic parsing engine simulate kar rahe hain
        const systemPrompt = `You are an elite E-commerce AI personal shopping assistant. 
        Here is our current inventory catalog:\n${productCatalogString}\n
        Based on the user's request, analyze the catalog and recommend the top 2 or 3 most relevant products. 
        Explain clearly WHY you are recommending them in a friendly, conversational tone.`;

        // 3. Simulating prompt analysis framework response structure
        // Jab real Groq/OpenAI key `.env` mein daaloge, toh bas yahan direct fetch trigger lagana hoga
        const mockAIResponse = `Based on your request "${prompt}", I scanned our inventory and recommend the following products:\n\n1. High Performance Smart Gear: Fits your technical preferences perfectly.\n2. Aesthetic Premium Items: Matches top trending user design lookups.\n\nLet me know if you want to add these directly to your checkout cart!`;

        res.status(200).json({
            success: true,
            recommendation: mockAIResponse
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAIRecommendations };