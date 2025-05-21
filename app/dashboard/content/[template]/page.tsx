import Content from '@/components/Content';
import Templates from '@/lib/Templates';
import React from 'react'

export async function generateMetadata({ params }: { params: { template: string } }) {
  const selectedTemp = Templates.find((item) => item.slug === params.template);

    return {
        title: selectedTemp?.name + " | ConWrite.ai",
        description:
            `${selectedTemp?.desc} | ConWrite.ai`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        openGraph: {
            title: selectedTemp?.name + " | ConWrite.ai",
            description:`${selectedTemp?.desc} | ConWrite.ai`,
            url: `${process.env.ECOM_STORE_URL}/content/${selectedTemp?.slug}`,
            images: [
                {
                    url: '/demo2.png',
                    width: 711,
                    height: 400,
                    alt: 'ConWrite.ai template preview',
                },

            ],
            siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
        },
    }
};

const page = ({ params }: { params: { template: string } }) => {

  const selectedTemp = Templates.find((item) => item.slug === params.template);
  return (
    <Content selectedTemp={selectedTemp}/>
  )
}

export default page
