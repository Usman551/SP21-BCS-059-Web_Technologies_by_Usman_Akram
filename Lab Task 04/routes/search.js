let express = require("express");
let router = express.Router();
let MenuItem = require("../models/product");
    router.get('/search', async (req, res) => {
        const searchQuery = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
    
        // Save search term in session
        if (!req.session.searchHistory) {
            req.session.searchHistory = [];
        }
        req.session.searchHistory.push(searchQuery);
        if (req.session.searchHistory.length > 10) {
            req.session.searchHistory.shift();
        }
    
        // Search for menu items
        const menuItems = await MenuItem.find({
            name: new RegExp(searchQuery, 'i')
        }).skip(skip).limit(limit);
        
        // Get total count for pagination
        const totalItems = await MenuItem.countDocuments({
            name: new RegExp(searchQuery, 'i')
        });
    
        res.render('search', {
            menuItems,
            searchHistory: req.session.searchHistory,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            searchQuery
        });
    });
module.exports = router;