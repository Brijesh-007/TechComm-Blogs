import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { type } from "os";
import { useState } from "react";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ScrollButton } from "../../components/ScrollButton";
import ThemeButton from "../../components/ThemeButton";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  console.log(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header />
      <ScrollButton />
      <ThemeButton />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="Main Image"
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3 font-semibold">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="Author image"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <a href={`/author/${post.author.slug.current}`}>
              <span className="text-green-600">{post.author.name}</span>
            </a>{" "}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-2xl my-5 mx-auto border-solid border-yellow-500" />

      {/* comment section */}
      {submitted ? (
        <div className="flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Your comment has been Submitted
          </h3>
          <p>Once it has been approved, it will appear below</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this?</h3>
          <h4 className="text-3xl font-bold">Leave a Comment below</h4>
          <hr className="mt-2 p-3" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring-1"
              type="text"
              placeholder="Your Name"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring-1"
              type="email"
              placeholder="Your email address"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-blue-500 outline-none focus:ring-1"
              placeholder="Enter your comments here..."
              rows={8}
            />
          </label>
          {/* form validation errors */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- Name field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">- Email field is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">- Comment field is required</span>
            )}
          </div>
          <input
            type="submit"
            className="bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}

      {/* Comments */}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-md shadow-gray-900 space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>
                <span className="text-blue-400 font-bold">{comment.name}:</span>{" "}
                {comment.comment}
              </p>
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id,
    slug{
    current
  }
  }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug][0]{
  _id,
  _createdAt,
  title,
  slug,
  author->{
  name,
  image,
  bio,
  slug,
  },
  "comments":*[
    _type=="comment" 
    && post._ref==^._id 
    && approved==true
  ],
  description,
  mainImage,
  body,
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60 * 60 * 8,
  };
};
