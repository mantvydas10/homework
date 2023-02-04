import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import "./Countries.css";
import { apiUrl } from "../../util/api";
import FilterByRegion from "../FilterByRegion/FilterByRegion";
import SearchInput from "../SearchInput/SearchInput";
import FilterByArea from "../FilterByArea/FilterByArea";
import Header from "../Header/Header";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(18);

  const getCountries = async () => {
    try {
      const res = await fetch(`${apiUrl}`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v2/name/${countryName}`
      );

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v2/region/${regionName}`
      );
      if (!res.ok) throw new Error("Failed..........");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  const getCountryByArea = async () => {
    try {
      const res = await fetch(`${apiUrl}`);

      if (!res.ok) throw new Error("Failed..........");

      const data = await res.json();
      const lithuaniaArea = 65300;

      setCountries(
        data.filter(
          (country) => country.area !== null && country.area < lithuaniaArea
        )
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  // Ascending, Descending ---->

  const sortData = (order) => {
    const sortedData = [...countries].sort((a, b) => {
      if (a.name < b.name) return order === "asc" ? -1 : 1;
      if (a.name > b.name) return order === "asc" ? 1 : -1;
      return 0;
    });

    setCountries(sortedData);
    setSortOrder(order);
  };

  // Pagination ---->

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterByRegion onSelect={getCountryByRegion} />
        </div>
        <div className="filter">
          <FilterByArea onSelect={getCountryByArea} />
        </div>
      </div>

      <select value={sortOrder} onChange={(e) => sortData(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <ul className="country__bottom">
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}
        {currentItems.map((country, index) => (
          <li key={index}>
            <div className="country__card">
              <div className="country__img">
                <img src={country.flag} alt={country.name} />
              </div>

              <div className="country__data">
                <h3>{country.name}</h3>
                <h6> Region: {country.region}</h6>
                <h6> Area: {country.area} km²</h6>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={countries.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Countries;
