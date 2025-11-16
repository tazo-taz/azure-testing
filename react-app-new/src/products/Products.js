import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import { useDispatch, useSelector } from 'react-redux';
import { ButtonFooter, CardContent } from '../components';
import { loadProductsAction } from '../store';
import { loadProductsApi } from '../store/product.api';

function ProductList({
  handleDeleteProduct,
  handleSelectProduct,
}) {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data) || [];
  const productss = []
  console.log(productss, products);

  useEffect(() => {
    loadProductsApi().then((data) => {
      console.log(data);
      dispatch(loadProductsAction(data));
    });
  }, [dispatch])

  function selectProduct(e) {
    const product = getSelectedProduct(e);
    handleSelectProduct(product);
    navigate(`/products/${product.id}`); // Replace history.push with navigate
  }

  function deleteProduct(e) {
    const product = getSelectedProduct(e);
    handleDeleteProduct(product);
  }

  function getSelectedProduct(e) {
    const index = +e.currentTarget.dataset.index;
    return products[index];
  }

  return (
    <div>
      {products && products.length === 0 && <div>Loading datasda ...</div>}
      <ul className="list">
        {products && products.map((product, index) => (
          <li key={product.id} role="presentation">
            <div className="card">
              <CardContent
                name={product.name}
                description={product.description}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteProduct}
                  label="Delete"
                  dataIndex={index}
                  dataId={product.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectProduct}
                  label="Edit"
                  dataIndex={index}
                  dataId={product.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
