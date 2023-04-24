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
import Link from 'next/link';
import info from '../projects/info.png'


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
      "description": "Coded a VR game centered around alleviating loneliness",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: C#, Unity, HTC Vive, XR SDKs",
      "website": "https://github.com/HackXR-2023/"
    },
    {
      "project": "ETH San Francisco",
      "date": "November 2022",
      "description": "Built a liquidity routing protocol for NFT AMM supporting multiple EVM chains",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
      "website": "https://ethglobal.com/showcase/tapp-finance-sw413"
    },
    {
      "project": "Calhacks 9.0",
      "date": "October 2022",
      "description": "First Place- Bounty Program",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: Solana, Solidity, Rust, Orca SDK, Jupiter SDK, ReactJS",
      "website": "https://live.calhacks.io/"
    },
    {
      "project": "USF Sustainability Challenge",
      "date": "Second Place",
      "description": "Company focusing on creator-based tools",
      "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
      "tech": "Technologies: technology 1, programming language, etc. with words",
      "website": "https://myusf.usfca.edu/sustainability/sustainability-design-challenge"
    }
  ]




  // const largeDescriptions = [
  //   {
  // "project": "MIT Reality Hack",
  // "date": "January 2023",
  // "description": "Built various products centered around new AI technologies",
  // "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  // "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
  // "website": "https://vocalaifrontend.vercel.app"
  //   },
  //   {
  //     "project": "ETH San Francisco",
  //     "date": "November 2022",
  //     "description": "Built various products centered around new AI technologies",
  //     "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  //     "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
  //     "website": "https://vocalaifrontend.vercel.app"
  //   },
  //   {
  //     "project": "Calhacks 9.0",
  //     "date": "October 2022",
  //     "description": "First Place- Bounty Program",
  //     "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  //     "tech": "Technologies: technology 1, programming language, etc. with words",
  //     "website": "https://www.google.com"
  //   },
  //   {
  //     "project": "USF Sustainability Challenge",
  //     "date": "Second Place",
  //     "description": "Company focusing on creator-based tools",
  //     "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  //     "tech": "Technologies: technology 1, programming language, etc. with words",
  //     "website": "https://www.google.com"
  //   }
  //   //, {
  //   //   "project": "Speech Helper",
  //   //   "date": "Jan 2022",
  //   //   "description": "Company focusing on creator-based tools",
  //   //   "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  //   //   "tech": "Technologies: technology 1, programming language, etc. with words",
  //   //   "website": "https://www.google.com"
  //   // },
  //   // {
  //   //   "project": "Sustainability Dashboard",
  //   //   "date": "Jan 2022",
  //   //   "description": "Led a task force of students to rebuild university's energy dashboard",
  //   //   "bullets": ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"],
  //   //   "tech": "Technologies: technology 1, programming language, etc. with words",
  //   //   "website": "https://www.google.com"
  //   // }

  // ]

  return (
    <section className="text-black font-serif">
      <h1 className="font-bold text-7xl font-serif mb-5">Hacks</h1>
      {
        largeDescriptions.map(d =>
          <Link
            target='_blank'
            href={d.website}>
            <p

              className="max-w-2xl bg-gradient-to-r rounded-xl py-6 px-5 cursor-pointer  transition duration-200 active:scale-90 active:  from-emerald-100 to-fuchsia-200 leading-none mt-6 text-4xl hover:bg-gradient-to-r hover:scale-105 hover:from-emerald-200 hover:to-fuchsia-300">
              {d.project} <span className='text-xl'>{d.date}</span>
              <br />
              <span className='text-sm leading-0'>
                {d.description}
              </span>

              <ul className='pt-3 ml-5 text-lg  list-disc'>
                {d.bullets.map(bullet =>
                  <>{
                    d.hasOwnProperty("special") ?
                      <li className="mt-2 rounded-none px-1 py-1 hover:bg-gradient-to-r  hover:from-blue-400 hover:to-blue-400 bg-gradient-to-r from-blue-400 to-blue-400">
                        {bullet}
                      </li> :
                      <li>
                        {bullet}
                      </li>
                  }
                  </>
                )}
              </ul>
              <span className='text-sm'></span> <br />
              <span className='leading-1 text-xs'>
                {d.tech}
              </span>
              {/* <github /> */}
              <div className='pt-2 flex gap-x-2'>
                {
                  d.hasOwnProperty("github") &&
                  <Link
                    target='_blank'
                    href="https://github.com">
                    <Image
                      className='cursor-pointer h-5 w-5'
                      alt='github'
                      src={github} />
                  </Link>
                }
                {
                  d.hasOwnProperty("website") &&
                  <Link
                    target='_blank'
                    href="https://github.com">

                    <Image
                      // onClick={() => window.open(d.website, "_blank")}
                      className='cursor-pointer h-5 w-5'

                      alt='website'
                      src={website} />
                  </Link>
                }
                {
                  d.hasOwnProperty("info") &&
                  <Link
                    target='_blank'
                    href="https://github.com">

                    <Image
                      // onClick={() => window.open(d.website, "_blank")}
                      className='cursor-pointer h-5 w-5'

                      alt='website'
                      src={info} />
                  </Link>
                }

              </div>
            </p>
          </Link>

        )

      }


    </section>
  );
}
