const { Client, Storage, InputFile } = require("node-appwrite");
const { getPathKey, getUrlFile, bytesToHumanReadable } = require("./utils");

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
        if (file?.hash?.length > 36) {
          file.hash = file.hash.slice(0, 36);
        }

        const path = getPathKey(file.hash, file.ext, directory);
        const inputFile = InputFile.fromStream(file.stream, path, file.size);

        const newFile = await storage.createFile(
          bucketId,
          file.hash,
          inputFile
        );

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

    const deleteFile = async (file) => {
      try {
        if (file?.hash?.length > 36) {
          file.hash = file.hash.slice(0, 36);
        }

        await storage.deleteFile(bucketId, file.hash);
      } catch (error) {
        throw new Error(error?.message);
      }
    };

    const checkFileSize = async (file, { sizeLimit }) => {
      console.log({ file, sizeLimit });
      if (file?.sizeInBytes > sizeLimit) {
        throw new Error(
          `${file.name} exceeds size limit of ${bytesToHumanReadable(
            sizeLimit
          )}.`
        );
      }
    };

    return {
      upload: uploadFile,
      uploadStream: uploadFile,
      delete: deleteFile,
      checkFileSize,
    };
  },
};
