import { redirect } from "@remix-run/react";

export async function loader() {
  throw redirect("https://blog.transit.chat/");
  // console.log(process.env.NEXT_PUBLIC_GHOST_URL,
  //   process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY)
  // const api = new TSGhostContentAPI(
  //   process.env.NEXT_PUBLIC_GHOST_URL || "",
  //   process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY || "",
  //   "v5.47.0"
  // );
  //
  // const featuredPosts = await api.posts.browse({ limit: 3, filter: "featured:true", order: "published_at DESC" })
  //   .fields({
  //     title: true,
  //     slug: true,
  //     id: true,
  //     published_at: true,
  //     primary_author: true,
  //     feature_image: true,
  //     excerpt: true,
  //   }).fetch()
  // const allPosts = await api.posts.browse({ limit: 10, filter: "featured:false", order: "published_at DESC" })
  //   .fields({
  //     title: true,
  //     slug: true,
  //     id: true,
  //     published_at: true,
  //     primary_author: true,
  //     twitter_image: true,
  //     excerpt: true,
  //   }).fetch()
  // if (!allPosts.success || !featuredPosts.success || !featuredPosts || !featuredPosts.data || featuredPosts.data.length === 0) throw redirect("/#pricing")
  // return typedjson({ allPosts: allPosts.data, featuredPosts: featuredPosts.data })
}

// export default function Blog() {
//   const { allPosts, featuredPosts } = useTypedLoaderData<typeof loader>()
//   if (!allPosts || !featuredPosts || featuredPosts.length === 0) return null
//
//   return (
//     <>
//       <Hero />
//       <Tags />
//
//       {/* Featured article */}
//       <section>
//
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           <div className="py-8 md:py-16">
//
//             <article className="max-w-sm mx-auto space-y-5 md:max-w-none md:flex md:items-center md:space-y-0 md:space-x-8 lg:space-x-16">
//               {/* Image */}
//               {featuredPosts && featuredPosts[0]!.feature_image ?
//                 <Link className="relative block group overflow-hidden md:w-1/2" to={`/blog/${featuredPosts[0]!.slug}`} data-aos="fade-down">
//                   <img className="w-full aspect-[16/9] md:aspect-[27/17] object-cover group-hover:scale-105 transition duration-700 ease-out" src={featuredPosts[0]!.feature_image} width={540} height={340} alt={featuredPosts[0]!.title} />
//                   <div className="absolute top-6 right-6">
//                     <svg className="w-8 h-8" viewBox="0 0 32 32">
//                       <circle className="fill-slate-900" fillOpacity=".48" cx="16" cy="16" r="16" />
//                       <path className="fill-yellow-500" d="M21.954 14.29A.5.5 0 0 0 21.5 14h-5.36l.845-3.38a.5.5 0 0 0-.864-.446l-6 7A.5.5 0 0 0 10.5 18h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
//                     </svg>
//                   </div>
//                 </Link> : null
//               }
//               {/* Content */}
//               <div className="md:w-1/2" data-aos="fade-up">
//                 <header>
//                   <h2 className="h4 md:text-4xl lg:text-5xl font-playfair-display mb-3">
//                     <Link className="text-slate-800 hover:underline hover:decoration-blue-100" to={`/blog/${featuredPosts[0]!.slug}`}>{featuredPosts[0]!.title}</Link>
//                   </h2>
//                 </header>
//                 <p className="text-lg text-slate-500 grow">{featuredPosts[0]!.excerpt}</p>
//                 <footer className="flex items-center mt-4">
//                   <div>
//                     <span className="text-slate-300"> · </span>
//                     {featuredPosts[0]!.published_at ? <span className="text-slate-500"><PostDate dateString={featuredPosts[0]!.published_at} /></span> : null}
//                   </div>
//                 </footer>
//               </div>
//             </article>
//
//           </div>
//
//         </div>
//       </section>
//
//       {/* All articles */}
//       <section className="bg-slate-50">
//
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           <div className="py-8 md:py-16 space-y-16">
//
//             {/* Latest */}
//             <div>
//               <h2 className="h3 font-playfair-display text-center md:text-left mb-8">Latest</h2>
//
//               {/* Articles container */}
//               <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
//                 {allPosts.map((post, postIndex) => (
//                   <PostItem key={postIndex}
//                     slug={post.slug} publishedAt={post.published_at} image={post.twitter_image} title={post.title} summary={post.excerpt} author={post.primary_author?.name || 'Walter Jenkins'} />
//                 ))}
//               </div>
//             </div>
//
//             {/* <div> */}
//             {/*   <h2 className="h3 font-playfair-display text-center md:text-left mb-8">Popular</h2> */}
//             {/**/}
//             {/*   <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start"> */}
//             {/*     {popularPosts.map((post, postIndex) => ( */}
//             {/*       <PostItem key={postIndex} */}
//             {/*         slug={post.slug} publishedAt={post.published_at} image={post.twitter_image} title={post.title} summary={post.excerpt} author={post.primary_author?.name || 'Walter Jenkins'} /> */}
//             {/*     ))} */}
//             {/*   </div> */}
//             {/* </div> */}
//             {/**/}
//             {/* <CtaBox /> */}
//             {/**/}
//             {/* <div> */}
//             {/*   <h2 className="h3 font-playfair-display text-center md:text-left mb-8">Product &amp; News</h2> */}
//             {/**/}
//             {/*   <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start"> */}
//             {/*     {productPosts.map((post, postIndex) => ( */}
//             {/*       <PostItem key={postIndex} {...post} /> */}
//             {/*     ))} */}
//             {/*   </div> */}
//             {/* </div> */}
//
//             {/* See All Articles */}
//             <div className="text-center">
//               <button className="btn text-white bg-blue-600 hover:bg-blue-700 group">
//                 See All Articles <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
//               </button>
//             </div>
//
//           </div>
//
//         </div>
//       </section>
//     </>
//   )
// }
