import type { Metadata } from 'next';
import { queryBuilder } from 'lib/planetscale';
import { SignIn, SignOut } from './actions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Form from './form';
import github from "./github.png";
import website from "./website.png";
import Image from 'next/image';
import info from "./info.png"
import { features } from 'process';
import Link from 'next/link';


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
      "project": "AI Experiments",
      "date": "April 2023",
      "description": "Built various products centered around new AI technologies",
      "bullets": [
        "Explored novel speech syntehesis models and applications, including building an \"AI Cover\" generator with scripts hosted on EC2 instances long polling from SQS queues",
        "Built a custom Dreambooth pipeline hosted on EC2 Fargate instances to provide a \'group photo\' AI-generated image offering.",
        "Created custom vocal and music-making technology"
      ],
      "special": true,
      "tech": "Technologies: Python, Pytorch, Dreambooth, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
      "website": "https://aivocals.me"
    },
    {
      "project": "The Turing Demonstration",
      "date": "April 2023",
      "description": "Created a novel memory/value retrieval architecture for GPT-based agents",
      "bullets": [
        "Crafted a set of heuristics and retreival methods to create believable GPT-based agents, built in Python and orchestrated with AWS",
        "Dug into the social psychological literature to attempt to create an accurate simulcrum of human cognition/self-aware behavior",
        "Created a virtual interface to test believability/officially pass the Turing test, and got a 50% higher Mean Opinion Score when compared to vanilla GPTs."],
      "tech": "Technologies: Python, Stable Diffusion, AWS (S3, Cloudfront, Cognito, API Gateway, Lambda, SQS, EC2, SKS), NextJS/React, Typescript",
      "website": "http://localhost:3000",
      "github": "https://github.com"
    },
    {
      "project": "P-Hacking Dashboard",
      "date": "April 2023",
      "description": "Building a dashboard to explore top journals and academics' p-values over time",
      "bullets": [
        "Created an advanced web-scraping architecture to extract claimed p-values of academic papers",
        "Built an interface for public access to the data and submit requests",
        "Spread and gained publicity through various mediums"],
      "tech": "Technologies: ReactJS, Selenium, AWS",
      "website": "https://www.google.com",
      "info": true
    },
    {
      "project": "Healthy Technologies",
      "date": "March 2023",
      "description": "Company focusing on improving the world's digital consumption",
      "bullets": [
        "Built a chrome extension which blocks designated distracting websites from usage, with customizable values",
        "Grew newsletter to [] devoted subscribers",
        "Coded an iOS app to bring digital minimalism to the most emotionally toxic piece of tech available today, the phone- currently in development"],
      "tech": "Technologies: React, AWS, Javascript, XCode, React Native, Expo",
      "website": "https://healthytechnologies.xyz"
    },
    {
      "project": "Rarefied Technologies",
      "date": "February 2023",
      "description": "Company focusing on creator-based tools",
      "bullets": [
        "Built a white-label customizable search engine/chatbot for creators which integrates with Twitter, Youtube, Substack, and Beehiiv.",
        "Coded various creator tools, like a Youtube viewing activity analyzer and anti-spam technology",
        "Building white-label community platform software"],
      "tech": "Technologies: React, Python, AWS",
      "website": "https://rarefied.technology"
    },

    {
      "project": "Researcher in a Box",
      "date": "Jan 2023",
      "description": "Created a research tool that speaks to you",
      "bullets": [
        "",
        "Bullet Point 2",
        "Bullet Point 3"],
      "tech": "Technologies: NextJS, AWS, EKS",
      "website": "https://www.google.com"
    },
    {
      "project": "Shuttle Ordering App",
      "date": "December 2022",
      "description": "Led a task force of students to rebuild university's energy dashboard",
      "bullets": [
        "Applied a liberatory design mindset to app devleopment, and prototyped an \"Uber for campus shuttle\"",
        "Spoke and negotiated with administration and various beaurocracies involved in the upkeep of the shuttle",
        "Managed 7 engineering students in process"],
      "tech": "Technologies: NodeJS, React, AWS",
      "website": "https://www.google.com"
    },
    {
      "project": "Speech Helper",
      "date": "December 2022",
      "description": "Company focusing on creator-based tools",
      "bullets": [
        "Bullet Point 1",
        "Bullet Point 2",
        "Bullet Point 3"],
      "tech": "Technologies: React Native, Python, Pytorch, AWS",
      "website": "https://www.google.com"
    },
    {
      "project": "Sustainability Dashboard",
      "date": "December 2022",
      "description": "Led a task force of students to rebuild university's energy dashboard",
      "bullets": [
        "Bullet Point 1",
        "Bullet Point 2",
        "Bullet Point 3"],
      "tech": "Technologies: D3.JS, React, AWS",
      "website": "https://www.google.com"
    }

  ]

  return (
    <section className="text-black font-serif">
      <h1 className="font-bold text-7xl font-serif mb-5">Projects</h1>
      {
        largeDescriptions.map(d =>
          <Link
            target='_blank'
            href={d.website}>
            <p
              className='max-w-2xl bg-gradient-to-r rounded-xl py-6 px-5 cursor-pointer hover:bg-gradient-to-r transition duration-200 active:scale-90 active:  hover:scale-105 hover:from-emerald-200 hover:to-fuchsia-300 from-emerald-100 to-fuchsia-200 leading-none mt-6 text-4xl'>
              {d.project} <span className='text-xl'>{d.date}</span>
              <br />
              <span className='text-sm leading-0'>
                {d.description}
              </span>

              <ul className='pt-3 ml-5 text-lg  list-disc'>
                {d.bullets.map(bullet =>
                  <>{
                    d.hasOwnProperty("special") ?
                      <li className="mt-2 rounded-xl px-1 py-1 hover:bg-gradient-to-r  hover:from-blue-400 hover:to-blue-400 bg-gradient-to-r from-blue-200 to-blue-400">
                        {bullet}
                      </li> :
                      <li>
                        {bullet}
                      </li>
                  }
                  </>
                )}
              </ul>
              <span className='text-sm'>(200 users, 3 paid)</span> <br />
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
