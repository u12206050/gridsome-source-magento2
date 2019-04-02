

function gql() {
  return `
fragment categoryInfo on CategoryTree {
  id
  name
  image
  description
  meta_title
  meta_description
  meta_keywords
  display_mode
  is_anchor
  include_in_menu
  url_key
  url_path
}

query {
  category(id: 1) {
    id
    name
    image
    description
    meta_title
    meta_description
    meta_keywords
    display_mode
    is_anchor
    include_in_menu
    url_key
    url_path
    children {
      ... on CategoryTree {
      	...categoryInfo
      }
      children {
        ... on CategoryTree {
          ...categoryInfo
        }
        children {
          ... on CategoryTree {
            ...categoryInfo
          }
          children {
            ... on CategoryTree {
              ...categoryInfo
            }
            children {
              ... on CategoryTree {
                ...categoryInfo
              }
              children {
                ... on CategoryTree {
                  ...categoryInfo
                }
                children {
                  ... on CategoryTree {
                    ...categoryInfo
                  }
                  children {
                    ... on CategoryTree {
                      ...categoryInfo
                    }
                    children {
                      ... on CategoryTree {
                        ...categoryInfo
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
}


export default function load({ gqlClient }) {
  const res = await gqlClient.request(gql())

  const allCategories = []

  const addCategory = function(category, parent) {
    if (category.id) {

      if (parent) {
        category.parent___NODE = parent.id
        parent.children___NODE.push(category.id)
      }

      allCategories.push(category)

      if (Array.isArray(category.children)) {
        category.children___NODE = []
        category.children.forEach(child => {
          addCategory(child, category)
        })
      }

    }
  }

  addCategory(res.category)

  return allCategories
}