import { useAuth } from 'reactfire';

type SignOutHandler = () => void;

const useSignOut = (): SignOutHandler => {
  const auth = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return handleSignOut;
};

export default useSignOut;
