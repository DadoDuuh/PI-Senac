import "./Main.scss";

export default function Main(props) {
  return (
    <main className="project-main">
      <header className="main-header">
      </header>
      {props.children}
      <footer className="main-footer"></footer>
    </main>
  );
}