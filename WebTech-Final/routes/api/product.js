let express = require("express");
let router = express.Router();
let MenuItem = require("../../models/product");
// Root route to display all menu items
router.get('/menue', async (req, res) => {
    const menuItems = await MenuItem.find();
    res.render('menue', { menuItems });
});

// Form to create a new menu item
router.get('/menu/create', (req, res) => {
    res.render('admin/createmenue');
});

// Create a new menu item
router.post('/menu', async (req, res) => {
    const { name, description, price } = req.body;
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.redirect('/menue');
});

// Show a specific menu item
router.get('/menu/:id', async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    res.render('admin/show', { menuItem });
});

// Form to edit a menu item
router.get('/menu/:id/edit', async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    res.render('admin/edit', { menuItem });
});

// Update a menu item
router.put('/menu/:id', async (req, res) => {
    const { name, description, price } = req.body;
    await MenuItem.findByIdAndUpdate(req.params.id, { name, description, price });
    res.redirect('/menue');
});

// Delete a menu item
router.delete('/menu/:id', async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.redirect('/menue');
});


module.exports = router;