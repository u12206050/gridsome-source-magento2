# @gridsome-source-magento2

> Gather products, categories and cms content from Magento that can be fetched with GraphQL in your components.

***NOT READY YET**

Feel free to contribute with PR.

## Install
- `yarn add @gridsome-source-magento2`
- `npm install @gridsome-source-magento2`

## Usage

```js
module.exports = {
  plugins: [
    {
      use: '@gridsome-source-magento2',
      options: {
        baseUrl: 'https://yourstore.url',
        authToken: 't8hTv275TuRVpaQ38rtzX6jBar',
      }
    }
  ]
}
```