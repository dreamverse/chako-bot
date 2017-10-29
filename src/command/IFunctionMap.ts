export interface IFunctionMap {
    [key: string]: (responseParams:any, chatInstance?:any) => Promise<string>;
}