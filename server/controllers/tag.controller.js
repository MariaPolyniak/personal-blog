const TagModel = require('../models/tag.model');

exports.createTag = async (req, res) => {
  const tag = new TagModel({
    name: req.body.name,
  });

  try {
    await tag.save();

    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.getTag = async (req, res) => {
  try {
    const tag = await TagModel.findOne({ name: req.params.name });
    res.json(tag);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.updateTag = async (req, res) => {
  try {
    const tag = await TagModel.findOne({ name: req.params.name });

    if(!tag) {
      return res.status(404).json({ message: "No data found" });
    }

    const updatedTag = await TagModel.updateOne(
      { name: req.params.name },
      { $set: { name: req.body.name } }
    );

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteTag = async (req, res) => {
  try {
    const tag = await TagModel.findOne({ name: req.params.name });

    if(!tag) {
      return res.status(404).json({ message: "No data found" });
    }

    await TagModel.deleteOne({ name: req.params.name });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
