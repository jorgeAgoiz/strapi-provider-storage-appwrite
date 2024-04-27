# strapi-provider-storage-appwrite

<div>
  <img title="Appwrite" alt="Appwrite logo" src="https://seeklogo.com/images/A/appwrite-logo-D33B39992A-seeklogo.com.png" width="160px" height="120px" />
  <img title="Strapi" alt="Strapi logo" src="https://seeklogo.com/images/S/strapi-icon-logo-2E03188067-seeklogo.com.png" width="120px" height="120px" />
</div>


## Resources

- [LICENSE](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi documentation](https://docs.strapi.io)
- [Appwrite website](https://www.appwrite.io/)
- [Appwrite documentation](https://www.appwrite.io/docs)
- [Github repository](https://github.com/jorgeAgoiz/strapi-provider-storage-appwrite)

## Installation

```bash
# using yarn
yarn add strapi-provider-storage-appwrite

# using npm
npm install strapi-provider-storage-appwrite --save
```

## Configuration

- `provider` defines the name of the provider, in this case we must put "strapi-provider-storage-appwriter".
- `providerOptions` is passed down during the construction of the provider. (ex: `new StorageClient(config)`).
- `providerOptions.apiUrl` RESTful endpoint to manage your Appwrite project.
- `providerOptions.projectId` ID of your Appwrite project.
- `providerOptions.bucketId` ID of your Appwrite bucket.
- `providerOptions.directory` directory inside the bucket where you want to store your files.
- `sizeLimit` maximum size limit for your files on bytes.

See the [documentation about using a provider](https://docs.strapi.io/developer-docs/latest/plugins/upload.html#using-a-provider) for information on installing and using a provider. To understand how environment variables are used in Strapi, please refer to the [documentation about environment variables](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html#environment-variables).

### Provider Configuration

`./config/plugins.js` or `./config/plugins.ts` for TypeScript projects:

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-storage-appwrite",
      providerOptions: {
        apiUrl: env("APPWRITE_API_ENDPOINT"),
        projectId: env("APPWRITE_PROJECT_ID"),
        bucketId: env("APPWRITE_BUCKET_ID"),
        directory: env("APPWRITE_BUCKET_DIRECTORY"),
      },
      sizeLimit: 1000000000,
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
        checkFileSize: {},
      },
    },
  },
  // ...
});
```

### Security Middleware Configuration

Due to the default settings in the Strapi Security Middleware you will need to modify the `contentSecurityPolicy` settings to properly see thumbnail previews in the Media Library. You should replace `strapi::security` string with the object bellow instead as explained in the [middleware configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order) documentation.

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            env("APPWRITE_API_ENDPOINT"),
          ],
        },
      },
    },
  },
  // ...
];
```
