import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`;

const info = `import me from '../app/avatar.jpg';

export const name = 'Pablo Hansen';
export const avatar = me;
export const about = () => {
  return (
    <>
      I'm a <b>Software Engineer in San Francisco</b>, where I'm learning about and building in AI and full-stack software!
    </>
  );
};
export const bio = () => {
  return (
    <>
       I've always loved creating things and software engineering has provided a fantastic outlet for that!
    </>
  );
};
`;

const about = `export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <p className="my-5 text-2xl text-neutral-800 dark:text-neutral-200">
      Hey, I'm Pablo.
    </p>
    <div className="text-xl prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
      <p>
        I'm currently a <b>Software Engineer in San Francisco</b>, where I
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
    </section>
  );
}
`;

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`))
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === 'false') {
    // This means it's not the template, it's my legit site
    // I orderride the env variable for my site. This means that when
    // folks clone this repo for the first time, it will delete my personal content
    return;
  }

  const libDir = path.join(process.cwd(), 'lib');
  const contentDir = path.join(process.cwd(), 'content');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const aboutDir = path.join(process.cwd(), 'app', 'about');

  await deleteFolderRecursive(contentDir);
  await deleteFolderRecursive(imagesDir);
  await fs.mkdir(contentDir);
  await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template);
  await fs.writeFile(path.join(libDir, 'info.tsx'), info);
  await fs.writeFile(path.join(aboutDir, 'page.tsx'), about);
})();
