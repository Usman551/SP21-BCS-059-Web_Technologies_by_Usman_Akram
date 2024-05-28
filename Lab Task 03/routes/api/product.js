let express = require("express");
let router = express.Router();
let MenuItem = require("../../models/product");

// Root route to display all menu items
router.get('/allmenue', async (req, res) => {
    const menuItems = await MenuItem.find();
    res.render('admin/allmenue', { menuItems });
});


// Create a new menu item
router.post('/admin/menu/create', async (req, res) => {
    const { name, description, price } = req.body;
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    console.log('Menue item created successfully');
    res.redirect('/admin');
});

// Show a specific menu item
router.get('/menu/:id', async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    res.render('admin/show',);
});

// Form to edit a menu item
router.get('/admin/menu/:id/edit', async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    res.render('admin/menueedit', { menuItem });
});

// Update a menu item
router.put('/admin/menu/:id/update', async (req, res) => {
    const { name, description, price } = req.body;
    await MenuItem.findByIdAndUpdate(req.params.id, { name, description, price });
    console.log('Menue item updated successfully');
    res.redirect('/admin');
    
});

// Form to delete a menu item
router.get('/admin/menu/:id/delete', async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    res.render('admin/menuedelete', { menuItem });
});

// Delete a menu item
router.delete('/admin/menu/:id/delete', async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    console.log('Menue item deleted successfully');
    res.redirect('/admin');
});


module.exports = router;