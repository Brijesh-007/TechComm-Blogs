import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ScrollButton } from "../components/ScrollButton.js";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import ThemeButton from "../components/ThemeButton";
import { useUser } from "@auth0/nextjs-auth0";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const { user, error, isLoading } = useUser();
  console.log(posts);
  return (
    <div className="dark:bg-black">
      <ScrollButton />
      <Header />
      <ThemeButton />
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center bg-gray-400 border-y border-black py-10 lg:py-0 mt-4 rounded-lg dark:bg-slate-500">
          <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-2xl font-serif">
              <span className="underline decoration-black decoration-4 dark:decoration-white">
                TechComm
              </span>{" "}
              is a place to write and deliever your technical knowledge and
              experiences.
            </h1>
            {/* <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h2> */}
          </div>

          <img
            src="/TechComm-logos_black.png"
            className="hidden md:inline-flex h-32 lg:h-80"
          />
        </div>

        {/* Render Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer border rounded-lg overflow-hidden relative bg-no-repeat bg-cover">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt="Blog Image"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-20 transition duration-300 ease-in-out bg-cyan-500"></div>
                <div className="flex justify-between p-5 bg-white dark:bg-black object-cover">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt="Post Image"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    author->{
    name,
    image,
  },
  description,
  mainImage
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
};
