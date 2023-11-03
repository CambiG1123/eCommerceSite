const router = require('express').Router();
const { Category, Product } = require('../../models');

// Middleware function for error handling
function handleErrors(err, res) {
  console.log(err);
  res.status(500).json(err);
}

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    handleErrors(error, res);
  }
});

// GET a single category by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    if (!category) {
      return res.status(404).json({ message: 'No category found with this id' });
    }
    res.json(category);
  } catch (error) {
    handleErrors(error, res);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(categoryData);
  } catch (error) {
    handleErrors(error, res);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    const [numUpdatedRows, updatedCategories] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numUpdatedRows === 0) {
      return res.status(404).json({ message: 'No category found with this id' });
    }
    res.json(updatedCategories[0]);
  } catch (error) {
    handleErrors(error, res);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const numDeletedRows = await Category.destroy({
      where: { id: req.params.id },
    });
    if (numDeletedRows === 0) {
      return res.status(404).json({ message: 'No category found with this id' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
});

module.exports = router;