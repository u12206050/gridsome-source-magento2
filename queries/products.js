
function gql(pageSize, currentPage) {
  return `
query {
  products (
    filter:{
      sku: {
        like:"%"
      }
    }
    pageSize: ${pageSize}
    currentPage: ${currentPage}
  ) {
    items {
      id
      type_id
      attribute_set_id
      sku
      name

      description {
        html
      }
      short_description {
        html
      }
      meta_title
      meta_keyword
      meta_description

      image {
        label
        url
      }
      small_image {
        label
        url
      }

      url_key

      categories {
        id
        name
        url_path
      }

      price {
        regularPrice {
          amount {
            value
            currency
          }
        }
      }

      ... on ConfigurableProduct {
        configurable_options {
          label
          values {
            label
            value_index
          }
        }
      }

      ... on GroupedProduct {
        items {
          position
          product {
            id
            type_id
          }
          qty
        }
      }
    }
  }
}`
}

export default async function load({ gqlClient }) {
  const pageSize = 100

  const { products: { total_count, page_info: { total_pages } } } = await gqlClient.request(`query {
    products (
      filter: { sku: { like:"%" } }
      pageSize: ${pageSize}
    ) {
      total_count
      page_info {
        total_pages
      }
    }
  }`)

  const allProducts = []

  for (let currentPage = 1; currentPage <= total_pages; currentPage++) {
    const { products: { items } } = await gqlClient.request(pageSize, currentPage)

    items.forEach(item => {
      // TODO: Sanitize and link fields
      allProducts.push(item)
    })
  }

  return allProducts
}