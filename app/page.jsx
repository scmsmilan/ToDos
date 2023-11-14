import Mainlist from "@components/Mainlist";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center orange_gradient p-4">
        TODO Manager
        {/* className="max-md:hidden" */}
      </h1>

      <h2 className="mt-0">Your buddy to organise your tasks</h2>
      <Mainlist />
    </section>
  );
};

export default Home;
