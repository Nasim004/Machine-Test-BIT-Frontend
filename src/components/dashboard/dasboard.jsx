import React, { useEffect, useState, useContext, useRef } from "react";
import "./dashboard.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import logo from "../../assests/python.png";

function Dashboard() {
  const { username } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const genderChartRef = useRef(null);
  const titleChartRef = useRef(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [titleCounts, setTitleCounts] = useState(null);

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=100"
        );
        const sortedDataByGender = sortDataByGender(response.data.results);
        setUser(sortedDataByGender);
        const sortedDataByTitle = sortDataByTitle(sortedDataByGender);
        setTitleCounts(sortedDataByTitle);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomUser();
  }, []);

  useEffect(() => {
    if (user) {
      renderGenderPieChart();
    }
  }, [user]);

  useEffect(() => {
    if (titleCounts) {
      renderTitlePieChart();
    }
  }, [titleCounts]);

  const sortDataByGender = (data) => {
    const sortedData = data.sort((a, b) => {
      const genderA = a.gender.toLowerCase();
      const genderB = b.gender.toLowerCase();
      if (genderA < genderB) return -1;
      if (genderA > genderB) return 1;
      return 0;
    });

    return sortedData;
  };

  const sortDataByTitle = (data) => {
    const titleCounts = {
      Mr: 0,
      Mrs: 0,
      Ms: 0,
      Monsieur: 0,
      Madame: 0,
      Mademoiselle: 0,
    };

    data.forEach((user) => {
      const title = user.name.title;
      if (titleCounts.hasOwnProperty(title)) {
        titleCounts[title]++;
      }
    });

    return titleCounts;
  };

  const renderGenderPieChart = () => {
    const maleCount = user.filter(
      (user) => user.gender.toLowerCase() === "male"
    ).length;

    const femaleCount = user.filter(
      (user) => user.gender.toLowerCase() === "female"
    ).length;

    setMaleCount(maleCount);
    setFemaleCount(femaleCount);

    const options = {
      series: [maleCount, femaleCount],
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: ["Male", "Female"],
      theme: {
        monochrome: {
          enabled: true,
          color: "#999999",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        show: false,
      },
    };

    const chart = new ApexCharts(genderChartRef.current, options);
    chart.render();
  };

  const renderTitlePieChart = () => {
    const titles = Object.keys(titleCounts);
    const counts = Object.values(titleCounts);

    const options = {
      series: counts,
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: titles,
      theme: {
        monochrome: {
          enabled: true,
          color: "#999999",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        show: false,
      },
    };

    const chart = new ApexCharts(titleChartRef.current, options);
    chart.render();
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="company__logo">
              <img src={logo} alt="React Logo" style={{ height: "50px" }} />
            </span>

            <div className="d-flex">
              <span className="navbar-text me-3 mt-3 textname">
                Welcome {username}
              </span>
              <button
                className="btn btn-primary loginbutton"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div className="row">
        <div className="col-md-2 sidebar">
          <p className="sidebar-heading">DASHBOARD</p>
        </div>
        <div className="col-md-10 section-3">
          <div className="charts">
            <p className="pieheading1">KEY PERFORMANCE INDICATORS</p>

            <div className="row">
              <div className="col-md-2 pieheading1">
                <p>GENDER</p>
              </div>
              <div className="col-md-5">
                <div ref={genderChartRef} id="genderChart"></div>
              </div>
              <div className="col-md-5 pieheading1">
                <p>TOTAL USERS = 100</p>
                <p>MALE = {maleCount}</p>
                <p>FEMALE = {femaleCount}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 pieheading1">
                <p>TITLES</p>
              </div>
              <div className="col-md-5">
                <div ref={titleChartRef} id="titleChart"></div>
              </div>
              <div className="col-md-5 pieheading1">
                <p>TOTAL USERS = 100</p>
                {titleCounts &&
                  Object.entries(titleCounts).map(([title, count]) => (
                    <p key={title}>
                      {title} = {count}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
