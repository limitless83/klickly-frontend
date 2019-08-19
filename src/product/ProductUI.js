import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor(props) {
    super(props);
    // NOTE: I didn't use Redux to store products because I won't modify them.
    this.state = {
      storeName: '',
      products: [],
    };
  }

  componentDidMount() {
    const { match: { params: { storeName } } } = this.props;
    if (storeName) {
      fetch(`${process.env.REACT_APP_API}/api/products?storeName=${storeName}`)
        .then((res) => res.json())
        .then((json) => this.setState({
          storeName,
          products: json,
        }))
        .catch((error) => {
          const { addNotification } = this.props;
          addNotification({
            type: 'error',
            message: error.toString(),
          });
        });
    }
  }

  render() {
    const { storeName, products } = this.state;
    return (
      <>
        <h3>{`Products from ${storeName}`}</h3>
        <span>{`Total ${products.length} products`}</span>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <div>
                <span>Title: </span>
                {product.title}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default Product;
