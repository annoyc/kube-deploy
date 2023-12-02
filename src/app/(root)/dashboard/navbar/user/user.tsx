import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const User = async () => {
  const session = await getServerAuthSession();
  // console.log("session", session);
  return (
    <div>
      <div className="text-center text-2xl text-black">
        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img alt="user image" src={session.user?.image || ""} />
              </div>
            </div>
            <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
              {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li> */}
              <li>
                <Link
                  href="/api/auth/signout"
                  className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href={"/api/auth/signin"}
            className="btn btn-neutral w-40 rounded-2xl"
          >
            登录
          </Link>
        )}
      </div>
      {/* <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link> */}
    </div>
  );
};

export default User;
