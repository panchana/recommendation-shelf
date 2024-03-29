const categoryStrategies = [
  'BEST_SELLERS',
  'MOST_POPULAR',
  'PRICE_REDUCTION',
  'NEW_RELEASES',
]

const productStrategies = ['SIMILAR_PRODUCTS', 'BEST_CHOICE', 'BOUGHT_TOGETHER']

/* eslint-disable no-restricted-syntax */
enum RequestInputType {
  USER = 'USER',
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
  TAG_GROUP = 'TAG_GROUP',
  CAMPAIGN = 'CAMPAIGN',
  GROUP = 'GROUP',
  ANONYMOUS_USER = 'ANONYMOUS_USER',
  BRAND = 'BRAND',
  STORE = 'STORE',
}

/* eslint-disable max-params */
export const buildInputByStrategy = (
  strategy: string,
  productIds?: string[],
  categories?: string[],
  anonymousId?: string
): InputRecommendation => {
  if (categoryStrategies.includes(strategy)) {
    if (categories && categories.length > 0) {
      return {
        type: { primary: RequestInputType.CATEGORY },
        values: categories,
      }
    }

    if (productIds && productIds.length > 0) {
      return {
        type: { primary: RequestInputType.PRODUCT },
        values: productIds,
      }
    }

    return {
      type: { primary: RequestInputType.STORE },
    }
  }

  if (productStrategies.includes(strategy)) {
    return {
      type: { primary: RequestInputType.PRODUCT },
      values: productIds ?? [],
    }
  }

  return {
    type: { primary: RequestInputType.ANONYMOUS_USER },
    values: [anonymousId ?? ''],
  }
}
