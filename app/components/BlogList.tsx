import { Link } from "@remix-run/react";

interface BlogListProps {
  blogs: any[];
}

export default function BlogList({ blogs }: BlogListProps) {
  console.log(blogs);
  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="group border border-gray-300 rounded-2xl overflow-hidden">
              <img src="https://pagedone.io/asset/uploads/1696244317.png" alt="blogs tailwind section" className="w-full object-cover" style={{ height: "200px" }} />
              <div className="p-4 lg:p-6 transition-all duration-300 group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 block">Jan 01, 2023</span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{blog.title}</h4>
                <p className="text-gray-500 leading-6 mb-10">{blog.body}</p>
                <Link to={`/blogs/${blog.id}`} className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}