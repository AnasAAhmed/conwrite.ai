
import DashbordContent from '@/components/DashbordContent';
import SignInRedirect from '@/components/SignInRedirect';
import Templates from '@/lib/Templates';
import { auth } from '@clerk/nextjs/server';

// export const dynamic = 'force-static';
const Page: React.FC = async () => {
  const { userId } = await auth();
      if (!userId) {
          return (
              <SignInRedirect redirectTo={`/dashboard`} />
          );
      }
  const templates = Templates;
  return (
    <DashbordContent templates={templates} />
  );
};

export default Page;
