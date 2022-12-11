import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">SAC Solutions Pvt. Ltd!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located near to Beautiful Bekal Fort in Kerala, SAC Solutions provides an awesome software solutions in order to make your business
          successful!
        </p>
        <address className="public__addr">
          SAC Solutions Pvt. Ltd <br />
          Nr. Bekal Fort <br />
          Kasaragod, Kerala, India <br />
          <a href="http://www.google.com">(+91) 9207595679</a>
        </address>
        <br />
        <p>Owner: Athul C</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};

export default Public;
