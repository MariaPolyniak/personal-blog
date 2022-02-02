const tagRepository = require('./tag.repository');

exports.getPopularTags = async(req, res) => {
  try {
    const popularTags = await tagRepository.getPopularTags();

    const normalizedPopularTags = popularTags.map(tag => tag._id);

    res.json(normalizedPopularTags);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
