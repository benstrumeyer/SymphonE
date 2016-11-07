export interface IPayload<TData>
{
    success?:boolean;
    data?:TData;
    message?:string;
    error?:string;
}
