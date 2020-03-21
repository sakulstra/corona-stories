import Head from "next/head";
import Link from "next/link";

const Home = () => (
  <div className="container">
    <Head>
      <title>CoronaStories</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">Welcome to CoronaStories</h1>

      <p className="description">
        Unlike the name suggests this is not about the virus corona, but its
        inevitable effects on our society.
        <br />
        With corona speading fast and people slowly following the suggestions to
        stay at home, there's a gigantic amount of - ungifted, but willing -
        people sitting at home suddenly finding there alleged creative streak.
        <br />
        To prevent this written outpourings from ever wasting paper in print,
        we've built this platform to help you realize that 1) your in fact not
        gifted 2) reassure you you're not alone.
      </p>

      <div className="grid">
        <Link passHref href="/write-a-story">
          <a className="card">
            <h3>Start your story &rarr;</h3>
            <p>
              Select a genre and write the beginning of your story. Rest assured
              that other people will evolve it to sth sexual/racits or farty.
              People are bad.
            </p>
          </a>
        </Link>
        <Link passHref href="/browse-stories">
          <a className="card">
            <h3>Continue a story &rarr;</h3>
            <p>
              Select a genre and you'll get a story assigned which wou'll have
              the pleasure to read and continue with your very own
              interpretation. Let the juices flow.
            </p>
          </a>
        </Link>
      </div>
    </main>

    <footer>
      Proudly presented by{" "}
      <a
        href="https://twitter.com/sakulstra"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sakulstra
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
