import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [postResponse, commentsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`),
    fetch("https://jsonplaceholder.typicode.com/comments")
  ]);
  const [post, comments] = await Promise.all([
    postResponse.json(),
    commentsResponse.json()
  ]);
  return json({ post, comments });
};

export default function BlogDetail() {
  const { post, comments } = useLoaderData<typeof loader>();
  const relevantComments = comments.filter((comment: any) => comment.postId === post.id);

  return (
    <>
      <section className="relative pt-20 pb-24 bg-indigo-600">
        <div className="w-full max-w-4xl px-5 lg:px-11 mx-auto">
          <h1 className="text-white font-manrope font-semibold text-4xl leading-tight mb-8">{post.title}</h1>
        </div>
      </section>
      <section className="relative py-10 lg:py-16">
        <div className="w-full max-w-4xl px-5 lg:px-11 mx-auto">
          <article>
            <p>{post.body}</p>
          </article>
        </div>
      </section>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-5 lg:px-5 mx-auto">
          <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">Comments</h2>
          <div className="flex flex-col gap-6">
            {relevantComments.map((comment: any) => (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2.5 items-center">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://pagedone.io/asset/uploads/1714988283.png" alt={`${comment.name} image`} />
                    <div>
                      <h5 className="text-gray-900 text-sm font-semibold">{comment.name}</h5>
                      <h5 className="text-gray-500 text-xs">{comment.email}</h5>
                      <h6 className="text-gray-500 text-xs">1 hr ago</h6>
                    </div>
                  </div>
                  <button aria-label="Options" className="text-gray-900 bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                      <path d="M12 7h.01M12 12h.01M12 17h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-800 text-sm">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
