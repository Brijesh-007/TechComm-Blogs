import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect } from "react";
import PortableText from "react-portable-text";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ScrollButton } from "../components/ScrollButton";
import ThemeButton from "../components/ThemeButton";
import { urlFor } from "../sanity";
import { useRouter } from "next/router";

function registerauthor() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });
  return (
    <div>
      <Header />
      <ScrollButton />
      <ThemeButton />
      <div className="h-screen flex justify-center ">
        <div className="flex w-full lg:w-1/2 justify-center items-center space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white dark:bg-slate-800 rounded-md shadow-2xl p-5 dark:shadow-gray-600">
              <h1 className="text-gray-800 dark:text-white font-bold text-2xl mb-5">
                Register As an Author
              </h1>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl dark:bg-gray-500 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z" />
                </svg>
                <input
                  id="email"
                  className=" pl-2 w-full outline-none border-none dark:bg-gray-500"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={user?.email?.toString()}
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl dark:bg-gray-500 dark:text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none dark:bg-gray-500"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={user?.name?.toString()}
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl dark:bg-gray-500 dark:text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M351.8 367.3v-44.1C328.5 310.7 302.4 304 274.7 304H173.3c-95.73 0-173.3 77.65-173.3 173.4C.0005 496.5 15.52 512 34.66 512h378.7c11.86 0 21.82-6.337 28.07-15.43l-61.65-61.57C361.7 416.9 351.8 392.9 351.8 367.3zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM630.6 364.8L540.3 274.8C528.3 262.8 512 256 495 256h-79.23c-17.75 0-31.99 14.25-31.99 32l.0147 79.2c0 17 6.647 33.15 18.65 45.15l90.31 90.27c12.5 12.5 32.74 12.5 45.24 0l92.49-92.5C643.1 397.6 643.1 377.3 630.6 364.8zM447.8 343.9c-13.25 0-24-10.62-24-24c0-13.25 10.75-24 24-24c13.38 0 24 10.75 24 24S461.1 343.9 447.8 343.9z" />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none dark:bg-gray-500"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User Name"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl dark:bg-gray-500 dark:text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-5 w-5 text-gray-400"
                >
                  <path d="M256 128h64c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256C238.3 0 224 14.33 224 32v64C224 113.7 238.3 128 256 128zM528 64H384v48C384 138.5 362.5 160 336 160h-96C213.5 160 192 138.5 192 112V64H48C21.49 64 0 85.49 0 112v352C0 490.5 21.49 512 48 512h480c26.51 0 48-21.49 48-48v-352C576 85.49 554.5 64 528 64zM288 224c35.35 0 64 28.66 64 64s-28.65 64-64 64s-64-28.66-64-64S252.7 224 288 224zM384 448H192c-8.836 0-16-7.164-16-16C176 405.5 197.5 384 224 384h128c26.51 0 48 21.49 48 48C400 440.8 392.8 448 384 448z" />
                </svg>
                <span className="text-sm pl-2">Profile Picture</span>
                <input
                  className="pl-2 w-full outline-none border-none dark:bg-gray-500"
                  type="file"
                  placeholder="Profile Picture"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl dark:bg-gray-500 dark:text-white ">
                <textarea
                  className="pl-2 w-full outline-none border-none dark:bg-gray-500"
                  placeholder="About You"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default registerauthor;
