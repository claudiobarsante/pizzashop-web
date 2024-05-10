import { api } from '@/lib/axios';

export type OrderStatusType =
    | 'pending'
    | 'canceled'
    | 'processing'
    | 'delivering'
    | 'delivered';

export interface GetOrdersQuery {
    pageIndex?: number | null;
    orderId?: string | null;
    customerName?: string | null;
    status?: string | null;
}

export interface GetOrdersResponse {
    orders: {
        orderId: string;
        createdAt: string;
        status: OrderStatusType;
        customerName: string;
        total: number;
    }[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

export async function getOrders({
    pageIndex,
    customerName,
    orderId,
    status
}: GetOrdersQuery) {
    const response = await api.get<GetOrdersResponse>('/orders', {
        params: {
            pageIndex,
            orderId,
            customerName,
            status
        }
    });

    return response.data;
}
