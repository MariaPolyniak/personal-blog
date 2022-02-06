exports.normalizeTags = tags => {
  if(!tags || tags === '') {
    return [];
  } else {
    return tags.split(',');
  }
}
