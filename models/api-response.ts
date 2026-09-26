export type ApiResponse<T> = {
    version: number;
    success: boolean;
    data: T | null;
};
