import { json, redirect } from "@remix-run/node"; 
import { Form, useActionData } from "@remix-run/react"; 
import axios from "axios";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Remix Tailwind Starter Project" },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await axios.post('https://api.echomedi.com/api/user/auth', {
        identifier: email,
        password,
      });
    if (!response.data) {
        throw new Error('No data received');
      }
    const { user, jwt } = response.data;
    return redirect('/', {
        headers: {
          'Set-Cookie': `jwt=${jwt}; HttpOnly; Path=/;`
        }
      }); 
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'Login failed' }, { status: 400 });
  }
};

export default function Products() {
  const actionData = useActionData(); 
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <Form method="post" className="max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email" 
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </Form>
      </div>
    </>
  );
}