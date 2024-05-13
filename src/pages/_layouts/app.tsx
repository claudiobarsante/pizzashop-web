import { Header } from '@/components/header';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { api } from '@/lib/axios';
/*/
 We need to tell the root route where we want it to render its child routes. We do that with <Outlet>.
 */
export function AppLayout() {
    const navigate = useNavigate();
    // -- We need to redirect the user to the sign-in page if they try to access a page that requires authentication but they are not logged in.
    useEffect(() => {
        const interceptorId = api.interceptors.response.use(
            (response) => response, // -- if no errors, we return the response
            (error) => {
                if (isAxiosError(error)) {
                    const status = error.response?.status;
                    const code = error.response?.data.code;

                    if (status === 401 && code === 'UNAUTHORIZED') {
                        navigate('/sign-in', { replace: true }); // -- disable back to page using browser's back button
                    }
                }
            }
        );

        // We need to clean up the interceptor when the component unmounts.
        return () => {
            api.interceptors.response.eject(interceptorId);
        };
    }, [navigate]);
    return (
        <div className="flex min-h-screen flex-col antialiased">
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                <Outlet />
            </div>
        </div>
    );
}
