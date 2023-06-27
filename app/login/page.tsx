import AuthForm from '@/components/Auth/auth-form';

function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <AuthForm />
    </main>
  );
}

export default AuthPage;
