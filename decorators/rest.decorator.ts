import {HttpMethod} from "../types/http-method"
import {MyRouter} from "../types/my-router";


//all Router implements MyRouter interface
export function rest(
    httpMethod: HttpMethod,
    path: string,
) {
    return(target: MyRouter, propertyName: string): any => {
    console.log('Rest function as decorator is working')
    };
}
