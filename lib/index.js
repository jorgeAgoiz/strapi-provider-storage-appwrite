const { Client, Storage, InputFile } = require("node-appwrite");
const { getPathKey, getUrlFile } = require("./utils");
/* https://appwrite.io/docs/references/cloud/client-web/storage */

/**
 * BUCKET ID => "662d04a80038654cfb59"
 * PROJECT ID => "662d047800178de5103a"
 * ENDPOINT => "https://cloud.appwrite.io/v1"
 */
/* let client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662d047800178de5103a");

const storage = new Storage(client);

const promise = storage.listFiles("662d04a80038654cfb59");

promise.then(
  function (response) {
    console.log(response); // Success
  },
  function (error) {
    console.log(error); // Failure
  }
); */

module.exports = {
  init(providerOptions) {
    const {
      apiUrl = "https://cloud.appwrite.io/v1",
      projectId,
      bucketId,
      directory,
    } = providerOptions;

    const client = new Client();

    client.setEndpoint(apiUrl).setProject(projectId);

    const storage = new Storage(client);

    const uploadFile = async (file) => {
      try {
        const path = getPathKey(file, directory);

        const fileSelected = InputFile.fromStream(file.stream, path, file.size);

        const newFile = await storage.createFile(
          bucketId,
          file?.hash,
          fileSelected
        );

        const publicUrl = getUrlFile(apiUrl, projectId, bucketId, newFile.$id);

        file.url = publicUrl;
      } catch (error) {
        console.log({ error });
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
