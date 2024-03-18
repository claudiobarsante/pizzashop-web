import { Link, LinkProps, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export type NavLinkProps = LinkProps;
export default function NavLink(props: NavLinkProps) {
    const { pathname } = useLocation();

    const isLinkActive = pathname === props.to;
    return (
        <>
            <Link
                data-current={isLinkActive}
                className={twMerge(
                    'flex items-center gap-1.5 text-sm font-medium text-muted-foreground',
                    'hover:text-foreground data-[current=true]:text-foreground'
                )}
                {...props}
            />
        </>
    );
}
/* data attributes --
HTML is designed with extensibility in mind for data that should be associated with a particular element but need not have any defined meaning. data-* attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, or extra properties on DOM.
 */
