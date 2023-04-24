import type { Metadata } from 'next';
import {
  GitHubIcon,
  YoutubeIcon,
  ArrowIcon,
  TwitterIcon,
} from 'components/icons';

export const metadata: Metadata = {
  title: 'About',
  description: 'VP of Developer Experience at Vercel.',
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-5xl font-serif">About Me</h1>
      <p className="my-5 text-2xl text-neutral-800 dark:text-neutral-200">
        Hey, I'm Pablo.
      </p>
      <div className="text-xl prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I'm currently a <b>Software Engineer at a stealth startup</b>, where I
          work on AI and architecting sustainable full-stack products.
        </p>
        <hr />
        <p>
          In my spare time, I'm passionate about many creative pursuits, including guitar, piano, literature,
          and of course, coding. You might catch me some days busking at Fisherman's Wharf!
        </p>
        <p>
          I absolutely love the creation process of software engineering- having an idea in my head 
          and seeing it come to life in real life is what drives me every day. I feel the same 
          inspiration when it comes to music. 
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/thepablohansen"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/pablojosecodes"
            className="flex w-full border border-neutral-200 dark:border-neutral-800  p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/@thepablohansen"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <YoutubeIcon />
              <div className="ml-3">YouTube</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
