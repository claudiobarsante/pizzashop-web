import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Building, ChevronDown, LogOut } from 'lucide-react';

export function AccountMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex select-none items-center gap-2"
                >
                    Pizza Shop
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    <span>Nom do usuário</span>
                    <span className="text-xs font-normal text-muted-foreground">
                        usuario@email.com
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Building className="mr-3 size-4" />
                    <span>Perfil da loja</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                    <LogOut className="mr-3 size-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
/* as you can not style the <DropdownMenuTrigger/> and it's responsable
to trigger the dropdown menu, you need to add the
property 'asChild'( will pass all the properties from the current component
to the child component) and style the <Button/> that will have all
the properties from the <DropdownMenuTrigger/>
 */
/*Use 'select-none' to prevent selecting text in an element and its children.
 */
