import {HttpMethod} from "../types/http-method"
import {MyRouter} from "../types/my-router";
import {RestDecoratorInfo} from "../types/rest-decorator";


//all Router implements MyRouter interface
export function rest(
    httpMethod: HttpMethod,
    path: string,
) {
    return(target: MyRouter, propertyName: string): any => { //decorator
    Reflect.set(target, '_restApiCall', {
        httpMethod,
        path,
        propertyName,
    } as RestDecoratorInfo);
    };
}
