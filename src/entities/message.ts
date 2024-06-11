export interface MessageEntity {
    message?: string,
    is_server?: boolean,
    loading?: boolean
    predictResponse: PredictResponse
}

export interface PredictResponse {
    keywords: string;
    products: Product
}

export interface Product {
    top1?: string;
    top1_score?: number;
    top2?: string;
    top2_score?: number;
    top3?: string;
    top3_score?: number;
}