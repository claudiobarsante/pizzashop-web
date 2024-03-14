import { Outlet } from 'react-router-dom';

/*/
 We need to tell the root route where we want it to render 
 its child routes. We do that with <Outlet>.
 */
export function AuthLayout() {
    return (
        <div>
            <h1>Autenticação</h1>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
