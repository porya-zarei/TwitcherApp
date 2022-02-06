export interface ApiResult<T> {
    result: T;
    errors: string[];
    ok: boolean;
    message: string;
    status: number;
}
