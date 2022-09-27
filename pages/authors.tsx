import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ScrollButton } from "../components/ScrollButton.js";
import ThemeButton from "../components/ThemeButton";
import { sanityClient, urlFor } from "../sanity";
import { Author, Post } from "../typings";

interface Props {
  authors: [Author];
}

export default function Authors({ authors }: Props) {
  console.log(authors);

  const shrinkBio = (str: string) => {
    if (str.length > 80) {
      return str.slice(0, 77) + "...";
    }
    return str;
  };

  return (
    <Fragment>
      <ScrollButton />
      <Header />
      <ThemeButton />
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center bg-green-400 border-y border-black py-10 lg:py-0 mt-4 rounded-lg">
          <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif">
              <span className="underline decoration-black decoration-4">
                TechComm
              </span>{" "}
              is a community of <i>authors</i> and curious <i>readers</i>
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

        {/* Render authors list */}
        <div className="grid grid-cols-1 gap-3 md:gap-6 p-2 md:p-6">
          <div className="pt-6 pb-12 bg-gray-300 dark:bg-gray-700" >
            <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
              Authors
            </h2>
            {authors.map((author) => (
              <Link href={`/author/${author.slug.current}`}>
                <div className="container lg:w-4/5 mx-auto flex flex-col items-center">
                  <div
                    v-for="card in cards"
                    className="flex flex-col md:flex-row
                                                  bg-white shadow-xl mt-4 w-4/5 mx-2 cursor-pointer rounded-lg overflow-hidden relative bg-no-repeat bg-cover dark:bg-slate-800"
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-20 transition duration-300 ease-in-out bg-cyan-900"></div>
                    <div className="h-64 w-auto md:w-1/2">
                      <img
                        className="inset-0 h-full w-full object-cover object-center"
                        src={urlFor(author.image).url()!}
                      />
                    </div>

                    <div className="w-full py-4 px-6 text-gray-800 dark:text-white flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold leading-tight truncate text-3xl ">
                          {author.name}
                        </h3>
                        <p className="mt-2">
                          {shrinkBio(author.bio[0].children[0].text)}
                        </p>
                      </div>
                      <div className="items-center">
                        <button className="mx-auto w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="author"]{
    _id,
    name,
    slug{
        current
    },
    bio,
    image
  }`;

  const authors = await sanityClient.fetch(query);

  return {
    props: { authors },
  };
};
