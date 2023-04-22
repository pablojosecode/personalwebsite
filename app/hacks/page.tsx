import type { Metadata } from 'next';
import { queryBuilder } from 'lib/planetscale';
import { SignIn, SignOut } from './actions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Form from './form';
import github from "./github.png";
import website from "./website.png";
import Image from 'next/image';
import { features } from 'process';

async function getGuestbook() {




  const data = await queryBuilder
    .selectFrom('guestbook')
    .select(['id', 'body', 'created_by', 'updated_at'])
    .orderBy('updated_at', 'desc')
    .limit(100)
    .execute();

  return data;
}

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export const dynamic = 'force-dynamic';

export default async function GuestbookPage() {
  let entries;
  let session;

  try {
    const [guestbookRes, sessionRes] = await Promise.allSettled([
      getGuestbook(),
      getServerSession(authOptions),
    ]);

    if (guestbookRes.status === 'fulfilled' && guestbookRes.value[0]) {
      entries = guestbookRes.value;
    } else {
      console.error(guestbookRes);
    }

    if (sessionRes.status === 'fulfilled') {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
    }
  } catch (error) {
    console.error(error);
  }
  const largeDescriptions = [
    {
      "project": "MIT Reality Hack",
      "date": "January 2023",
      "description": "Built various products centered around new AI technologies",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
      "website": "https://vocalaifrontend.vercel.app"
    },
    {
      "project": "ETH San Francisco",
      "date": "November 2022",
      "description": "Built various products centered around new AI technologies",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
      "website": "https://vocalaifrontend.vercel.app"
    },
    {
      "project": "Calhacks 9.0",
      "date": "October 2022",
      "description": "First Place- Bounty Program",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: technology 1, programming language, etc. with words",
      "website": "https://www.google.com"
    },
    {
      "project": "USF Sustainability Challenge",
      "date": "Second Place",
      "description": "Company focusing on creator-based tools",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: technology 1, programming language, etc. with words",
      "website": "https://www.google.com"
    }
    //, {
    //   "project": "Speech Helper",
    //   "date": "Jan 2022",
    //   "description": "Company focusing on creator-based tools",
    //   "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
    //   "tech": "Technologies: technology 1, programming language, etc. with words",
    //   "website": "https://www.google.com"
    // },
    // {
    //   "project": "Sustainability Dashboard",
    //   "date": "Jan 2022",
    //   "description": "Led a task force of students to rebuild university's energy dashboard",
    //   "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
    //   "tech": "Technologies: technology 1, programming language, etc. with words",
    //   "website": "https://www.google.com"
    // }

  ]

  return (
    <section className="text-black font-serif">
      <h1 className="font-bold text-7xl font-serif mb-5">Hacks</h1>
      {
        largeDescriptions.map(d =>
          <p className='leading-none pt-6 text-4xl'>
            {d.project} <span className='text-xl'>{d.date}</span>
            <br />
            <span className='text-lg'>
              {d.description}
            </span>

            <ul className='ml-5 text-md list-disc'>
              {d.bullets.map(bullet =>
                <li>
                  {bullet}
                </li>
              )}
            </ul>
            <span className='leading-none text-xs'>
              {d.tech}
            </span>
            {/* <github /> */}
            <div className='pt-2 flex gap-x-2'>
              <Image
                className='cursor-pointer h-5 w-5'
                alt='github'
                src={github} />
              <button
                className='cursor-pointer h-5 w-5'
              // onSubmit={() => console.log("HI")}
              >
                <Image
                  // onClick={() => window.open(d.website, "_blank")}

                  alt='website'
                  src={website} />
              </button>
            </div>
          </p>

        )

      }


    </section>
  );
}
