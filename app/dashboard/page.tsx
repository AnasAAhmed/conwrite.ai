
import DashbordContent from '@/components/DashbordContent';
import Templates from '@/lib/Templates';

// export const dynamic = 'force-static';
const Page: React.FC = () => {
  const templates = Templates;
  return (
    <DashbordContent templates={templates} />
  );
};

export default Page;
