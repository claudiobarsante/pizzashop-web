import { api } from '@/lib/axios';

export interface RestaurantRegistrationBody {
    restaurantName: string;
    managerName: string;
    email: string;
    phone: string;
}

export async function restaurantRegistration({
    restaurantName,
    managerName,
    email,
    phone
}: RestaurantRegistrationBody) {
    await api.post('/restaurants', {
        restaurantName,
        managerName,
        email,
        phone
    });
}
