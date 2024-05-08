import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Building, ChevronDown, LogOut, StoreIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/get-profile';
import { getManagedRestaurant } from '@/api/get-managed-restaurant';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';

export function AccountMenu() {
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    });

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
        useQuery({
            queryKey: ['managed-restaurant'],
            queryFn: getManagedRestaurant,
            staleTime: Infinity //-- not to refetch when the window loads
        });

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex select-none items-center gap-2"
                    >
                        {isLoadingManagedRestaurant ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ) : (
                            managedRestaurant?.name
                        )}
                        <ChevronDown className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <Skeleton />
                        ) : (
                            <>
                                {' '}
                                <span>{profile?.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.email}
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="mr-3 size-4" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                        <LogOut className="mr-3 size-4" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <StoreProfileDialog />
        </Dialog>
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
