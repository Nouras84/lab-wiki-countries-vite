import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "https://ih-countries-api.herokuapp.com";

function CountryDetails() {
  const { countryId } = useParams();
  const [foundCountry, setFoundCountry] = useState(null);

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const { data } = await axios.get(`${API_URL}/countries/${countryId}`);
        setFoundCountry(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }

    fetchCountryData();
  }, [countryId]);

  if (!foundCountry) {
    return (
      <Layout>
        <LoadingMessage message="Country Details" />
      </Layout>
    );
  }

  return (
    <Layout>
      <CountryDetailHeader />
      <CountryFlag
        flagCode={foundCountry.alpha2Code.toLowerCase()}
        altText={`flag-of-${foundCountry.name.common}`}
      />
      <CountryInfo country={foundCountry} />
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container text-center">{children}</div>
    </>
  );
}

function LoadingMessage({ message }) {
  return (
    <>
      <Header text={message} />
      <p style={{ fontSize: "18px" }}>Loading...</p>
    </>
  );
}

function Header({ text }) {
  return <p style={{ fontSize: "24px", fontWeight: "bold" }}>{text}</p>;
}

function CountryDetailHeader() {
  return <Header text="Country Details" />;
}

function CountryFlag({ flagCode, altText }) {
  return (
    <img
      src={`https://flagpedia.net/data/flags/icon/72x54/${flagCode}.png`}
      alt={altText}
      style={{ width: "100px" }}
    />
  );
}

function CountryInfo({ country }) {
  return (
    <>
      <h1>{country.name.common}</h1>
      <CountryTable country={country} />
    </>
  );
}

function CountryTable({ country }) {
  return (
    <table className="table">
      <tbody>
        <TableRow label="Capital" value={country.capital[0]} />
        <TableRow label="Area" value={`${country.area} km²`} />
        <TableRow
          label="Borders"
          value={<CountryBorders borders={country.borders} />}
        />
      </tbody>
    </table>
  );
}

function TableRow({ label, value }) {
  return (
    <tr>
      <td style={{ width: "30%" }}>{label}</td>
      <td>{value}</td>
    </tr>
  );
}

function CountryBorders({ borders }) {
  return (
    <ul>
      {borders.map((alpha3, index) => (
        <li key={index}>
          <Link to={`/${alpha3}`}>{alpha3}</Link>
        </li>
      ))}
    </ul>
  );
}

export default CountryDetails;
