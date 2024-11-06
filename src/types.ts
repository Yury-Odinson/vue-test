export interface ProductItem {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
}

export interface ProductActions extends Partial<ProductItem> {
  isFavorite: boolean | null,
  isAdded: boolean | null,
  onClickFavorite: () => void,
  onClickCart: () => void
}
