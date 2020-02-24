import React, { Component } from "react";
import "../styles/review.css";

export default class Review extends Component {
  render() {
    return (
      <div className="reviews">
        <h2>
          {`${this.props.reviews.length} `}
          Reviews
        </h2>
        {this.props.reviews.map((review, i) => {
          return (
            <div className="card review" key={i}>
              <div className="content">
                <div className="user">
                  <div className="avatar"></div>
                  <div className="name">
                    <span>{review.author.name}</span>
                    <small>{review.author.location}</small>
                  </div>
                </div>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
                <p>{review.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
