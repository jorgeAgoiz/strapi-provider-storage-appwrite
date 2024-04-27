const path = require("path");

const getPathKey = (file, directory) => {
  const key = `${file.hash}${file.ext}`;
  return path.posix.join(directory, key);
};

const getUrlFile = (endpoint, projectId, bucketId, fileId) => {
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

module.exports = { getPathKey, getUrlFile };
