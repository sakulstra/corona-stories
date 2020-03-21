import Head from "next/head";
import LinkCard from "@components/LinkCard";
import { useLight } from "@utils/actions/useLight";

export default function Home() {
  const { light } = useLight();
  return (
    <div className="container">
      <Head>
        <title>CoronaStories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {light ? "Welcome to CoronaStories" : "fuck you."}
        </h1>

        <p className="description">
          Unlike the name suggests this is not about the virus corona, but its
          inevitable effects on our society.
          <br />
          With corona speading fast and people slowly following the suggestions
          to stay at home, there's a gigantic amount of - ungifted, but willing
          - people sitting at home suddenly finding there alleged creative
          streak.
          <br />
          To prevent this written outpourings from ever wasting paper in print,
          we've built this platform to help you realize that 1) your in fact not
          gifted 2) reassure you you're not alone.
        </p>

        <div className="grid">
          <LinkCard passHref href="/write-a-story">
            <h3>Start your story &rarr;</h3>
            <p>
              Select a genre and write the beginning of your story. Rest assured
              that other people will evolve it to sth sexual/racits or farty.
              People are bad.
            </p>
          </LinkCard>
          <LinkCard passHref href="/browse-stories">
            <h3>Continue a story &rarr;</h3>
            <p>
              Select a genre and you'll get a story assigned which wou'll have
              the pleasure to read and continue with your very own
              interpretation. Let the juices flow.
            </p>
          </LinkCard>
        </div>
      </main>

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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
