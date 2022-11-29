export interface StockData {

    "Global Quote": {
        "01. symbol": string,
        "02. open": string,
        "03. high": string,
        "04. low": string,
        "05. price": string,
        "06. volume": string,
        "07. latest trading day": string,
        "08. previous close": string
        "09. change": string,
        "10. change percent": string
    }
}

export interface SearchResult {

    "bestMatches": ResultItem[],
    "Error Message"?: string

}

export interface ResultItem {

    "1. symbol": string,
    "2. name": string,
    "3. type": string,
    "4. region": string,
    "5. marketOpen": string,
    "6. marketClose": string,
    "7. timezone": string,
    "8. currency": string,
    "9. matchScore": string

}

export interface ResultTileProps {

    "item": ResultItem
}

export interface Favorites {

    "myFavorites": string[]
}

export interface FavoritesTileProps {

    "symbol": string
}