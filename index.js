import { GraphQLClient } from 'graphql-request'
import axios from 'axios'

class Magento2Source {
  static defaultOptions () {
    return {
      graphqlEndpoint: undefined,
      authToken: ''
    }
  }

  constructor (api, options) {
    this.api = api
    const { baseUrl, authToken } = options
    const cleanUrl = baseUrl.replace(/\/+$/g, '')

    const headers = {'Authorization': `Bearer ${authToken}`}

    const restClient = axios.create({
      baseURL: `https://${cleanUrl}/rest`,
      timeout: 3000,
      headers
    })

    const gqlClient = new  GraphQLClient(`https://${cleanUrl}/graphql`, { headers })

    const clients = {
      restClient,
      gqlClient
    }

    api.loadSource(async store => {
      console.log(`Loading data from ${options.baseUrl}`)

      await this.getProducts(store)
      await this.getCategories(store)
      await this.getCmsPages(store)
    })
  }

  async getProducts(store, clients) {
    import load from './queries/products'

    const objects = await load(clients)
  }

  async getCategories(store, clients) {
    import load from './queries/categories'

    const objects = await load(clients)
  }

  async getCmsPages(store, clients) {
    import load from './queries/cmsPages'

    const objects = await load(clients)
  }

  normalizeFields (fields) {
    const res = {}

    for (const key in fields) {
      if (key.startsWith('_')) continue // skip links and embeds etc
      res[key] = this.normalizeFieldValue(fields[key])
    }

    return res
  }

  normalizeFieldValue (value) {
    if (value === null) return null
    if (value === undefined) return null
  }

}

module.exports = Magento2Source