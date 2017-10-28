export interface IFunctionMap {
    [key: string]: (chatInstance:any, parameters:any) => Promise<string>;
}