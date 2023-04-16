export class BaseException extends Error {
    constructor(
        protected fullPath: string, protected endpoint: string, protected method: string, protected data: Record<string, any> | null, protected bearer: string | null, protected statusCode: number
    ) {
        super();
    }
}