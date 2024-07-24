import { Link } from '@remix-run/react'

import PostDate from './post-date';


export default function PostItem({ ...props }: { slug: string; publishedAt: string | null | undefined; image: string | null; title: string; summary: string; author: string }) {
  return (
    <article className="h-full flex flex-col space-y-5" data-aos="fade-up">
      {props.image ? <Link className="block group overflow-hidden" to={`/blog/${props.slug}`}>
        <img className="w-full aspect-[16/9] md:aspect-[27/17] object-cover group-hover:scale-105 transition duration-700 ease-out" src={props.image} width={540} height={340} alt={props.title} />
      </Link> : null
      }
      <div className="grow flex flex-col">
        <header>
          <h3 className="h4 font-playfair-display mb-3">
            <Link className="text-slate-800 hover:underline hover:decoration-blue-100" to={`/blog/${props.slug}`}>{props.title}</Link>
          </h3>
        </header>
        <p className="text-lg text-slate-500 grow">{props.summary}</p>
        <footer className="flex items-center mt-4">
          <div>
            <a className="font-medium text-slate-800 hover:text-blue-600 transition duration-150 ease-in-out" href="#0">{props.author}</a>
            <span className="text-slate-300"> · </span>
            {props.publishedAt ? <span className="text-slate-500"><PostDate dateString={props.publishedAt} /></span> : null}
          </div>
        </footer>
      </div>
    </article>
  )
}
