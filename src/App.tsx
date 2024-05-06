import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme/theme-provider';

import './global.css';
import { router } from './routes';
import { queryClient } from './lib/react-query';

// -- '%s' is replaced with the name of the page
export function App() {
    return (
        <HelmetProvider>
            <ThemeProvider defaultTheme="light" storageKey="pizzashop-ui-theme">
                <Helmet titleTemplate="%s | Pizza Shop 🍕" />
                <Toaster richColors />
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}
