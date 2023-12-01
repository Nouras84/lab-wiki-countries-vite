import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "https://ih-countries-api.herokuapp.com";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_URL}/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <PageLayout>
      <PageHeader title="WikiCountries: Your Guide to the World" />
      <CountryList countries={countries} />
    </PageLayout>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ maxHeight: "90vh", overflow: "scroll" }}
      >
        {children}
      </div>
    </>
  );
}

function PageHeader({ title }) {
  return <h1 style={{ fontSize: "24px" }}>{title}</h1>;
}

function CountryList({ countries }) {
  return (
    <div className="list-group">
      {countries.map((country) => (
        <CountryLink key={country.alpha3Code} country={country} />
      ))}
    </div>
  );
}

function CountryLink({ country }) {
  return (
    <Link
      to={`/${country.alpha3Code}`}
      className="list-group-item list-group-item-action"
      style={{ textAlign: "center" }}
    >
      <img
        width="50"
        src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        alt={`flag-of-${country.name.common}`}
      />
      <p>{country.name.common}</p>
    </Link>
  );
}

export default HomePage;
