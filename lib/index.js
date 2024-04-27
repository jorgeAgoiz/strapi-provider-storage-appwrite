const { Client, Storage, InputFile } = require("node-appwrite");
const { getPathKey, getUrlFile } = require("./utils");

/**
 * @link https://appwrite.io/docs/references/cloud/client-web/storage
 *
 * BUCKET ID => "662d04a80038654cfb59"
 * PROJECT ID => "662d047800178de5103a"
 * ENDPOINT => "https://cloud.appwrite.io/v1"
 */

module.exports = {
  init({
    apiUrl = "https://cloud.appwrite.io/v1",
    projectId,
    bucketId,
    directory,
  }) {
    const client = new Client();

    client.setEndpoint(apiUrl).setProject(projectId);

    const storage = new Storage(client);

    const uploadFile = async (file) => {
      try {
        let hash = file.hash;

        if (file?.hash?.length > 36) {
          hash = file.hash.slice(0, 36);
        }

        const path = getPathKey(hash, file.ext, directory);
        const inputFile = InputFile.fromStream(file.stream, path, file.size);

        const newFile = await storage.createFile(bucketId, hash, inputFile);

        const publicUrl = getUrlFile({
          endpoint: apiUrl,
          bucketId,
          fileId: newFile.$id,
          projectId,
        });

        file.url = publicUrl;
      } catch (error) {
        throw new Error(error?.message);
      }
    };

    const deleteFile = async (file) => {};

    const getSignedUrl = async (file) => {};

    const checkFileSize = async (file, { sizeLimit }) => {};

    const isPrivate = async () => {};

    return {
      upload: uploadFile,
      uploadStream: uploadFile,
      delete: deleteFile,
      checkFileSize,
      getSignedUrl,
      isPrivate,
    };
  },
};
