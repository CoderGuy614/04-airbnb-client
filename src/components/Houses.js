import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "google-map-react";
import "../styles/cards.css";
import "../styles/grid.css";
import "../styles/maps.css";
import "../styles/nav.css";
import Thumbnail from "./Thumbnail";

class Houses extends React.Component {
  state = {
    houses: [],
    types: [],
    map: {
      key: {
        key: "AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0"
      },
      center: {
        lat: -8.652,
        lng: 115.137
      },
      zoom: 14
    }
  };

  search = e => {
    let target = e.target.value.toLowerCase();
    let originalHouses = this.state.originalHouses;
    let filteredHouses = originalHouses.filter(h => {
      return (
        h.title.toLowerCase().includes(target) ||
        h.city.toLowerCase().includes(target) ||
        h.region.toLowerCase().includes(target)
      );
    });
    this.setState({
      houses: filteredHouses,
      originalHouses: originalHouses
    });
  };

  typeSelect = e => {
    let typeChoice = e.target.value;
    let originalHouses = this.state.originalHouses;
    if (typeChoice == "all") {
      this.setState({
        houses: originalHouses
      });
    } else {
      let filteredHouses = originalHouses.filter(h => {
        return h.type.name == typeChoice;
      });
      this.setState({
        houses: filteredHouses,
        originalHouses: originalHouses
      });
    }
  };

  bedroomSelect = e => {
    let bedroomChoice = e.target.value;
    let originalHouses = this.state.originalHouses;
    let filteredHouses = originalHouses.filter(h => {
      return Number(h.bedrooms) >= Number(bedroomChoice);
    });
    this.setState({
      houses: filteredHouses,
      originalHouses: originalHouses
    });
  };

  maxPrice = e => {
    let originalHouses = this.state.originalHouses;
    let maxPrice = e.target.value;
    if (maxPrice) {
      let filteredHouses = originalHouses.filter(h => {
        return h.price <= maxPrice;
      });
      this.setState({
        houses: filteredHouses,
        originalHouses: originalHouses
      });
    } else {
      this.setState({
        houses: originalHouses
      });
    }
  };
  sortBy = e => {
    let sortBy = e.target.value;
    let originalHouses = this.state.originalHouses;
    if (sortBy == "price") {
      let sortedHouses = originalHouses.sort((a, b) => {
        return a.price - b.price;
      });
      this.setState({
        houses: sortedHouses,
        originalHouses: originalHouses
      });
    } else {
      let sortedHouses = originalHouses.sort((a, b) => {
        return b.rating - a.rating;
      });
      this.setState({
        houses: sortedHouses,
        originalHouses: originalHouses
      });
    }
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/houses`)
      .then(res => {
        this.setState({
          houses: res.data,
          originalHouses: res.data
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/types`)
      .then(res => {
        let typesArray = [];
        res.data.map(type => typesArray.push(type.name));
        this.setState({
          types: typesArray
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <nav>
          <a href="/" className="logo"></a>
          <div className="profile">
            <a href="/plus" className="button">
              <span>Airbnb Plus</span>
            </a>
          </div>
        </nav>
        <div className="filters">
          <select onChange={this.bedroomSelect}>
            {[...Array(6)].map((choice, i) => {
              return (
                <option key={i} value={i + 1}>
                  Min Bedrooms: {i + 1}{" "}
                </option>
              );
            })}
          </select>
          <select onChange={this.typeSelect}>
            <option value="all">All Types</option>
            {this.state.types.map((type, i) => {
              return (
                <option key={i} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <input
            onChange={this.maxPrice}
            type="number"
            placeholder="max price"
          />
          <select onChange={this.sortBy}>
            <option value="price">Sort By</option>
            <option value="price">Lowest Price</option>
            <option value="rating">Highest Rating</option>
          </select>
          <input
            onChange={this.search}
            type="text"
            className="search"
            placeholder="Search..."
          />
        </div>
        <div className="grid map">
          <div className="grid four large">
            {this.state.houses.map((house, index) => (
              <Link to={`/houses/${house._id}`}>
                <Thumbnail house={house} key={index} />
              </Link>
            ))}
          </div>
          <div className="map">
            <GoogleMap
              bootstrapURLKeys={this.state.map.key}
              center={this.state.map.center}
              zoom={this.state.map.zoom}
            ></GoogleMap>
          </div>
        </div>
      </>
    );
  }
}

export default Houses;
