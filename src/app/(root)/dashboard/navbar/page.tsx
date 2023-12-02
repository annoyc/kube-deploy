import User from "./user/user";
import Title from "./title/title";

const Page = () => {
  return (
    <main className="flex h-20 items-center justify-between px-8 py-8 text-black">
      <Title />
      <User />
    </main>
  );
};

export default Page;
