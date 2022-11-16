export interface StockData {
    MetaData: MetaData;
    TimeSeries: TimeSeries;
}

export interface MetaData {
    Information: string;
    Symbol: string;
    LastRefreshed: string;
    OutputSize: string;
    TimeZone: string;
}

export interface TimeSeries {
 
}
  
export interface DailyDetails {
    open: string;
    high: string;
    low: string;
    close: string;
    adjustedClose: string;
    volume: string;
    dividendAmount: string;
    splitCoefficient: string;
}
  