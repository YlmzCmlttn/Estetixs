'use client';
import { useFormStatus, useFormState } from 'react-dom';
import loginAction from '@/actions/auth/login';
import { useRouter,useSearchParams } from 'next/navigation';
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialState = { message: null, errors: {} };
    const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const response = await loginAction(prevState, formData);
        if (response.message === 'Authorized') {
            const nextUrl = searchParams.get('next');
            console.log('nextUrl', nextUrl);
            router.push(nextUrl ? nextUrl : '/dashboard');
        }

    }, initialState);
    return (
        <form action={formAction}>
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                name='email'
                id='email'
                placeholder='example@example.com'
                defaultValue=""
                aria-describedby="email-error"
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                id='password'
                placeholder='******************'
                defaultValue=""
                aria-describedby="email-error"
            />
            <SubmitButton />
            <p>
                {state?.message}
            </p>
        </form>
    );
}


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? (
                <div
                    role="status"
                >
                    <span>
                        Loading...
                    </span>
                </div>
            ) : (
                "Sign In"
            )}
        </button>
    );
}

export default LoginForm;
