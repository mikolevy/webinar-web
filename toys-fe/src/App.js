import React  from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProductTable({ products, onBuy }) {
  const productsRows = products.map((product) => {
        return (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price / 100}</td>
            <td><button onClick={() => onBuy(product.id)}>Kup</button></td>
          </tr>
        );
      });
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Cena</th>
                <th>Akcja</th>
            </tr>
            </thead>
            <tbody>
                {productsRows}
            </tbody>
        </table>
    )
}

function OrderTable({ products }) {
  const productsRows = products.map((product) => {
        return (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price / 100}</td>
          </tr>
        );
      });
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Cena</th>
            </tr>
            </thead>
            <tbody>
                {productsRows}
            </tbody>
        </table>
    )
}

function OrderBox({orderedProducts, name, onNameChange, createOrder}) {

    return (
      <div className="current-order">

        Imię i nazwisko: <input value={name} onChange={e => onNameChange(e.target.value)}/>
        {
            !!orderedProducts.length &&
            <div>
                <p> Produkty: </p>
                <OrderTable products={orderedProducts} />
                <button onClick={() => createOrder()}>Złóż zamówienie</button>
            </div>
        }
      </div>
  );
}

export default function Shop() {
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [orderedProducts, setOrderedProducts] = useState([])
    const [orderStatus, setOrderStatus] = useState(null)

    const onBuy = (productId) => {
        if (orderedProducts.find(product => product.id === productId))
            return
        const selectedProduct = products.filter(product => product.id === productId);
        setOrderedProducts([...orderedProducts, ...selectedProduct])
    }

    const createOrder = () => {
        axios
         .post('http://127.0.0.1:8000/toys-api/orders/', {
            client_fullname: name,
            elements: orderedProducts.map(product => product.id),
         })
         .then((response) => {
            setOrderStatus("Zamówienie przyjęte!");
         })
         .catch((err) => {
            setOrderStatus("Wystąpił błąd")
            console.log(err);
         });
    }

    useEffect(() => {
      axios
         .get('http://127.0.0.1:8000/toys-api/toys/')
         .then((response) => {
            setProducts(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);




    return (
        <div className="products">
          <div className="products-list">
          <p><b>Lista produktów</b></p>
            <ProductTable products={products} onBuy={onBuy}/>
          </div>
          <div className="order">
          <hr/><br/>
            <p><b>Aktualne zamówienie</b></p>
            {
                orderStatus ? orderStatus :
                <OrderBox
                    orderedProducts={orderedProducts}
                    name={name}
                    onNameChange={setName}
                    createOrder={createOrder}
                />
            }

          </div>
        </div>
      );
}
