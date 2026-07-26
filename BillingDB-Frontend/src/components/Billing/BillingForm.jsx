import { useState } from "react";
import '../../styles/common/form.css'
import '../../styles/common/table.css'
import { getProductPriceAndGst } from '../../api/invoiceApi'

function BillingForm({ parties, products }){
    const[selectedPartyId, setselectedPartyId] = useState('');
    const[selectedProductId, setselectedProductId] = useState('');
    const[price, setprice] = useState('');
    const[gstRate, setgstRate] = useState('');
    const[quantity, setquantity] = useState('');
    const[invoiceItems, setinvoiceItems] = useState([]);

    function handlePartyChange(event){
        setselectedPartyId(event.target.value);
        setselectedProductId('');
        setprice('');
        setgstRate('');
        setquantity('');
        setinvoiceItems([]);
    }

    async function handleProductChange(event){
        const productId = event.target.value;

        setselectedProductId(productId);
        setprice('');
        setgstRate('');

        if(!productId) return;

        try{
            const productPriceAndGst = await getProductPriceAndGst({
                partyId: Number(selectedPartyId),
                productId: Number(productId)
            });

            setprice(productPriceAndGst.price);
            setgstRate(productPriceAndGst.gstRate);
        } catch(e) { console.log(e); }
    }

    function handleQuantityChange(event){
        setquantity(event.target.value);
    }

    function addProduct(){
        const selectedProduct = products.find(function(product){
            return product.id === Number(selectedProductId);
        });

        const itemPrice = Number(price);
        const itemQuantity = Number(quantity);
        const itemGstRate = Number(gstRate);
        const subAmount = itemPrice * itemQuantity;
        const gstAmount = subAmount * (itemGstRate / 100);

        if(!selectedProduct) return;

        setinvoiceItems([
            ...invoiceItems,
            {
                productId: Number(selectedProductId),
                productName: selectedProduct.name,
                price: itemPrice,
                quantity: itemQuantity,
                gstRate: itemGstRate,
                subAmount: subAmount,
                gstAmount: gstAmount,
                total: subAmount + gstAmount
            }
        ]);

        setselectedProductId('');
        setprice('');
        setgstRate('');
        setquantity('');
    }

    return (
        <>
            <div className="form">
                <div>
                    <label htmlFor="partySelect">Select Party</label>

                    <select
                        id="partySelect"
                        name="partySelect"
                        value={selectedPartyId}
                        onChange={handlePartyChange}
                    >
                        <option value="">Select a party</option>

                        {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                                {party.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedPartyId && (
                    <>
                        <div>
                            <label htmlFor="productSelect">Select Product</label>

                            <select
                                id="productSelect"
                                name="productSelect"
                                value={selectedProductId}
                                onChange={handleProductChange}
                            >
                                <option value="">Select a product</option>

                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" value={price} readOnly />
                        </div>

                        <div>
                            <label htmlFor="gstRate">GST Rate</label>
                            <input id="gstRate" name="gstRate" type="number" value={gstRate} readOnly />
                        </div>

                        <div>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </div>

                        <button type="button" onClick={addProduct}>Add Product</button>
                    </>
                )}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>GST Rate</th>
                        <th>Sub Amount</th>
                        <th>GST Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {invoiceItems.length === 0 ? (
                        <tr>
                            <td colSpan="7">No products added</td>
                        </tr>
                    ) : (
                        invoiceItems.map(function(invoiceItem, index){
                            return(
                                <tr key={index}>
                                    <td>{invoiceItem.productName}</td>
                                    <td>{invoiceItem.price}</td>
                                    <td>{invoiceItem.quantity}</td>
                                    <td>{invoiceItem.gstRate}</td>
                                    <td>{invoiceItem.subAmount}</td>
                                    <td>{invoiceItem.gstAmount}</td>
                                    <td>{invoiceItem.total}</td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </>
    );
}

export default BillingForm;
