import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

function Header() {
  const { user, isLoading, error } = useUser();
  return (
    <header className="flex mx-auto justify-between text-lg font-semibold border-b-2 border-black dark:border-white dark:bg-slate-900">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="/TechComm.png"
            alt=""
            className="h-24 object-contain cursor-pointer"
          />
        </Link>
        <div className="cursor-pointer hidden md:inline-flex items-center space-x-5">
          <Link href="/">
            <h3>Home</h3>
          </Link>
          <Link href="/about">
            <h3>About</h3>
          </Link>
          {user && (
            <Link href="/registerauthor">
              <h3 className="text-white bg-amber-600 rounded-md px-4 py-1">Start writing</h3>
            </Link>
          )}
          <Link href="/authors">
            <h3 className="text-white bg-blue-600 px-4 py-1 rounded-full">
              Follow
            </h3>
          </Link>
        </div>
      </div>
      <div className="cursor-pointer flex items-center space-x-5 text-blue-600 dark:text-blue-300 mr-1">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && user ? (
          <>
            <p className="text-black dark:text-white">{user.name}</p>
            <img src={user.picture!} className="rounded-full w-8 h-8" />
            <Link href="/api/auth/logout">
              <h3 className="border rounded-full px-4 py-1 border-blue-600 dark:border-blue-300">
                {" "}
                Log Out{" "}
              </h3>
            </Link>
          </>
        ) : (
          <Link href="/api/auth/login">
            <h3> Log In/Sign Up </h3>
          </Link>
        )}
        {/* <Link href="/signin">
          <h3> Sign In </h3>
        </Link> */}
        {/* <Link href="/api/auth/signup">
          <h3 className="border rounded-full px-4 py-1 border-blue-600 dark:border-blue-300">
            Sign Up
          </h3>
        </Link> */}
      </div>
    </header>
  );
}

export default Header;
