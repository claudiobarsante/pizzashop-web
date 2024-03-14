import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import './global.css';
import { router } from './routes';

// -- '%s' is replaced with the name of the page
export function App() {
    return (
        <HelmetProvider>
            <Helmet titleTemplate="%s | Pizza Shop 🍕" />
            <Toaster richColors />
            <RouterProvider router={router} />
        </HelmetProvider>
    );
}
