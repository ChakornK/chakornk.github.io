import "./page.css";

export default () => {
  return (
    <main>
      <Cover />
      <Works />
    </main>
  );
};

const Cover = () => {
  return (
    <div className="page">
      <h1 className="font-semibold text-8xl">ChakornK</h1>
    </div>
  );
};

const Works = () => {
  return (
    <div className="page">
      <h2 className="font-semibold text-6xl">Works</h2>
    </div>
  );
};
