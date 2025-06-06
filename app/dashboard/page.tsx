
import DashbordContent from '@/components/DashbordContent';
import Templates from '@/lib/Templates';
import { auth } from '@clerk/nextjs/server';

// export const dynamic = 'force-static';
const Page: React.FC = async () => {
  await auth.protect()
  const templates = Templates;
  return (
    <DashbordContent templates={templates} />
  );
};

export default Page;
