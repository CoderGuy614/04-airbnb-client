import React from "react";

class Thumbnail extends React.Component {
  state = {
    house: this.props.house
  };
  componentWillReceiveProps(props) {
    this.setState({ house: props.house });
  }

  render() {
    return (
      <a
        className="card link"
        href={`/houses/${this.state.house._id}`}
        key={this.state.house._id}
        onMouseEnter={e => this.props.houseHover(this.state.house._id)}
      >
        <div
          className="image"
          style={{ backgroundImage: `url('${this.state.house.image}')` }}
        ></div>
        <div className="content">
          <small className="meta">
            {this.state.house.type.name} • {this.state.house.bedrooms} Bedrooms
          </small>
          <h2>{this.state.house.title}</h2>
          <small className="location">
            <i className="fas fa-map-marker-alt"></i>
            <span>
              {this.state.house.city}, {this.state.house.region}
            </span>
          </small>
          <span className="price">${this.state.house.price}/night</span>
          <span className="rating">
            {[...Array(this.state.house.rating)].map((star, i) => {
              return <i className="fas fa-star" key={i}></i>;
            })}
            {[...Array(5 - this.state.house.rating)].map((star, i) => {
              return <i className="far fa-star" key={i}></i>;
            })}
          </span>
        </div>
      </a>
    );
  }
}

export default Thumbnail;
