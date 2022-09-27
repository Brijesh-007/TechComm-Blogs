import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Author, Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { type } from "os";
import { useState } from "react";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ScrollButton } from "../../components/ScrollButton";
import ThemeButton from "../../components/ThemeButton";

interface Props {
  author: Author;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ author }: Props) {
  const [submitted, setSubmitted] = useState(false);
  console.log(author);

  return (
    <main>
      <Header />
      <ThemeButton />
      <ScrollButton />
      {/* <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="Main Image"
      /> */}
      <article className="max-w-3xl mx-auto p-5">
        <h2 className="text-2xl text-gray-500 mb-2 text-center font-semibold">One of the our best authors</h2>
        <div className="flex justify-center ">
          <div className="rounded-lg shadow-lg bg-white max-w-md">
            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
              <img
                className="rounded-t-lg"
                src={urlFor(author.image).url()!}
                alt=""
              />
            </a>
            <div className="p-6 rounded-b-lg items-center mx-auto text-center dark:bg-black">
              <h5 className="text-gray-900 text-2xl mb-2 font-bold  dark:text-white">
                {author.name}
              </h5>
              <p className="text-gray-700 text-base text-justify mb-4 dark:text-white">
                {author.bio[0].children[0].text}
              </p>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </article>
      <hr className="max-w-2xl my-5 mx-auto border-solid border-yellow-500" />

      <Footer />
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="author"]{
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
  const query = `*[_type=="author" && slug.current==$slug][0]{
    name,
    bio,
    image,
  }`;

  const author = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: { author },
    revalidate: 60 * 60 * 8,
  };
};
