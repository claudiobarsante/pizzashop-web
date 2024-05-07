import { restaurantRegistration } from '@/api/restaurant-registration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    restaurantName: z.string(),
    phone: z.string(),
    managerName: z.string()
});

type SignUpForm = z.infer<typeof schema>;
export function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SignUpForm>();

    const navigate = useNavigate();

    const { mutateAsync: registerRestaurant } = useMutation({
        mutationFn: restaurantRegistration
    });

    async function handleSignUp(data: SignUpForm) {
        try {
            await registerRestaurant({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone
            });

            toast.success(`${data.restaurantName} successfully registered!`, {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?email=${data.email}`)
                }
            });
        } catch (error) {
            toast.error(
                'Error registering restaurant! Please try again later.'
            );
        }
    }
    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button
                    variant="ghost"
                    asChild
                    className="absolute right-8 top-8"
                >
                    <Link to="/sign-in">Fazer login</Link>
                </Button>
                <div className="flex w-[358px] flex-col justify-center gap-6 ">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Criar conta grátis
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um parceiro e comece suas vendas!
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleSignUp)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">
                                Nome do estabelecimento
                            </Label>
                            <Input
                                id="restaurantName"
                                type="text"
                                {...register('restaurantName')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input
                                id="managerName"
                                type="text"
                                {...register('managerName')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...register('phone')}
                            />
                        </div>
                        <Button
                            disabled={isSubmitting}
                            className="w-full"
                            type="submit"
                        >
                            Finalizar cadastro
                        </Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos{' '}
                            <a href="" className="underline underline-offset-4">
                                termos de serviço
                            </a>{' '}
                            e{' '}
                            <a href="" className="underline underline-offset-4">
                                políticas de privacidade
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
/*In Tailwind CSS, the term "leading-relaxed" refers to a utility class that adjusts the line height of text to create a more relaxed spacing between lines.
The "leading-relaxed" utility class specifically sets the line height to a value that is greater than normal, resulting in more space between lines of text. This can be useful for improving readability, especially for longer passages of text.
*/

// -- Use the underline-offset-{width} utilities to change the space between the text and the underline
