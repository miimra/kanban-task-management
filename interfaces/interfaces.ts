export interface ICard {
    id: string,
    title: string,
    description: string,
}

export interface IColumn {
    id: string,
    index: string,
    title: string,
    cards: ICard[]
}
