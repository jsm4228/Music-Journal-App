


//function to get all products from shopping cart and their associated prices
//from the product_id, we can get the image URL, name, and price
const getCartInfo = async () => {
    console.log('working')
    const response = await axios.get('http://localhost:3001/api/shoppingCart/getAllProducts')
    const response_products = response.data[0].product
    let products = []
    response_products.forEach(element => {
        let productData = [element.name, element.image, element.price_num]
        products.push(productData)
    });
    console.log(products)
    return products
}

const clearCart = async () => {
    await axios.post(`http://localhost:3001/api/shoppingCart/clearCart`)
}




