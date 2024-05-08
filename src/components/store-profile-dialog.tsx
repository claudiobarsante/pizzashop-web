import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
    GetManagedRestaurantResponse,
    getManagedRestaurant
} from '@/api/get-managed-restaurant';

import { Button } from './ui/button';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { UpdateProfileBody, updateProfile } from '@/api/update-profile';

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable()
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
    const queryClient = useQueryClient();
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    });

    // -- Optimistic update --
    //*as soon as the user clicks on the button to save, the cache is updated using onMutate
    //*if an error occurs roolback to the previous cache
    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate: async (newProfile: UpdateProfileBody) => {
            // Snapshot the previous value
            // give us the currently stored data
            const previousCache =
                queryClient.getQueryData<GetManagedRestaurantResponse>([
                    'managed-restaurant'
                ]);
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['managed-restaurant']
            }); //-- cancel on going querys to not clash with the results of the updated cache
            // Optimistically update to the new value
            if (previousCache) {
                queryClient.setQueryData<GetManagedRestaurantResponse>(
                    ['managed-restaurant'],
                    { ...previousCache, ...newProfile }
                );
            }
            // Return a context object with the snapshotted value
            return { previousProfile: previousCache };
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError(_, __, context) {
            if (context?.previousProfile) {
                queryClient.setQueryData<GetManagedRestaurantResponse>(
                    ['managed-restaurant'],
                    context.previousProfile
                );
            }
        },
        // Always refetch after error or success:
        // You make sure you fetch the latest data from the server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['managed-restaurant'] });
        }
    });

    async function handleUpdateProfile(data: StoreProfileSchema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            });

            toast.success('Perfil atualizado com sucesso!');
        } catch {
            toast.error('Falha ao atualizar o perfil, tente novamente');
        }
    }

    // -- use values insted of defaultValues because name and description on the first moment will be empty
    // -- and them will be updated by useQuery
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? ''
        }
    });

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao
                    seu cliente
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input
                            className="col-span-3"
                            id="name"
                            {...register('name')}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">
                            Descrição
                        </Label>
                        <Textarea
                            className="col-span-3"
                            id="description"
                            {...register('description')}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        variant="success"
                        disabled={isSubmitting}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
