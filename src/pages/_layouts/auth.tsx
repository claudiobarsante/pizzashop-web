import { Pizza } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

/*/
 We need to tell the root route where we want it to render 
 its child routes. We do that with <Outlet>.
 */
export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-2">
            <div
                className={twMerge(
                    'flex flex-col justify-between h-full border-d border-foreground/5 ',
                    'bg-muted p-10 text-muted-foreground'
                )}
            >
                <div className="flex items-center gap-3 text-lg text-foreground">
                    <Pizza className="size-6" />
                    <span className="font-semibold">Pizza Shop</span>
                </div>
                <footer className="text-sm">
                    Painel do parceiro &copy; {new Date().getFullYear()}
                </footer>
            </div>

            <div className="flex flex-col justify-center items-center">
                <Outlet />
            </div>
        </div>
    );
}
