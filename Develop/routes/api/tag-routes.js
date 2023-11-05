const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
function handleErrors(err, res) {
  console.log(err);
  res.status(500).json(err);
}

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    handleErrors(error, res);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });
    if (!tag) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    res.json(tag);
  } catch (error) {
    handleErrors(error, res);
  }
});

router.post('/', async (req, res) => {
  // create a new tag\
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tagData);
  } catch (error) {
    handleErrors(error, res);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [numUpdatedRows, updatedTags] = await Tag.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numUpdatedRows === 0) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    const response = {
      message: "Tag successfully updated",
      data: updatedTags[0]
    }
    res.json(response)
    // res.json({message: "Tag successfully updated"})
    
  } catch (error) {
    handleErrors(error, res)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const numDeletedRows = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (numDeletedRows === 0) {
      return res.status(404).json({ message: 'No tag found with this id' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    handleErrors(error, res);
  }
});

module.exports = router;
