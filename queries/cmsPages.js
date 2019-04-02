

export default async function load({ restClient }) {
  const api = `${baseUrl}/V1/cmsPage/search?searchCriteria[pageSize]=100`

  const { items } = await restClient.get(api)

  return items
}