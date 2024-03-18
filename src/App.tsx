import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from 'sonner';

import './global.css';
import { router } from './routes';

// -- '%s' is replaced with the name of the page
export function App() {
    return (
        <HelmetProvider>
            <ThemeProvider defaultTheme="light" storageKey="pizzashop-ui-theme">
                <Helmet titleTemplate="%s | Pizza Shop 🍕" />
                <Toaster richColors />
                <RouterProvider router={router} />
            </ThemeProvider>
        </HelmetProvider>
    );
}
