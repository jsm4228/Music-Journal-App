const $productsBlock = $(`#products-display`)
const $backButton = $(`button`)
const $cartBackButton = $(`#cart-back`)
const computersBox = document.getElementById(`computers-box`)
const tabletsBox = document.getElementById(`tablets-box`)
const $cart = $(`#cart`)
const $cartProductsContainer = $(`#cart-products-container`)
const $cartPriceContainer = $(`#cart-price-container`)

// functions



const getTablets = async()=>{
    const apiGet = await axios.get(`http://localhost:3001/api/tablets`)
    const apiData = apiGet.data
    return apiData
}

const getComputers = async()=>{
    const apiGet = await axios.get(`http://localhost:3001/api/computers`)
    const apiData = apiGet.data
    return apiData
}

const productsDisplay = async()=>{
    const tablets = await getTablets()
    const computers = await getComputers()
    populate(tablets)
    populate(computers)
}

productsDisplay()

const getShoppingCart = async()=>{
    const apiGet = await axios.get(`http://localhost:3001/api/shoppingCart/getAllProducts`)
    const apiData = apiGet.data
    console.log(apiData[0].product)
    return apiData[0].product
}

getShoppingCart()

const addToCart = async(id)=>{
    const apiGet = await axios.post(`http://localhost:3001/api/shoppingCart/addItem/${id}`)
    const apiData = apiGet.data
    console.log(apiData)
    return apiData
}

const clearCart = async () => {
    await axios.post(`http://localhost:3001/api/shoppingCart/clearCart`)
}

$cart.on(`click`, async()=>{
    $(`#page-1`).addClass(`none`)
    $(`header`).addClass(`none`)
    $(`#page-2`).removeClass(`none`)
    await cartHandler()
    $(`.cart-delete-img`).on(`click`, async()=>{
        await clearCart()
        $cartProductsContainer.empty()
        $cartPriceContainer.empty()
    })
})



$cartBackButton.on(`click`, async()=>{
    $(`#page-1`).removeClass(`none`)
    $(`header`).removeClass(`none`)
    $(`#page-2`).addClass(`none`)
    const computers = await getComputers()
    const tablets = await getTablets()
    $productsBlock.empty()
    populate(tablets)
    populate(computers)
    $(`#sort-options`).removeClass(`none`)
    checkHandler()
    $cartBackButton.addClass(`hide`)
})


const populate = (apiData)=>{
    for (let i of apiData){
        $productsBlock.removeClass(`product-page`)
        const $productDiv = $(`<div class="product-div">`)
        const $productName = $(`<h2 class="product-name">`)
        const $productImg = $(`<img class="product-img">`)
        const $productPrice = $(`<h3 class="product-price">`)
        const $productContainer = $(`<div class="product-container">`)
        const $addToCart = $(`<img id="add-to-cart">`)
        const $productInfoDiv = $(`<div class="info-div">`)
        const $productSpecsDiv = $(`<div class="specs-div">`)
        const table = document.createElement("table")
        for (const key in i.specs) {
            const row = document.createElement("tr")
            const keyCell = document.createElement("td")
            const valueCell = document.createElement("td")
            keyCell.textContent = `${key}:`
            valueCell.textContent = i.specs[key]
            row.appendChild(keyCell)
            row.appendChild(valueCell)
            table.appendChild(row)
        }
        $addToCart.attr(`src`, `./images/add.png`)
        $productName.html(i.name)
        $productImg.attr(`src`, i.image)
        $productPrice.html(i.price)
        $productName.removeClass(`bigger-text`)
        $productImg.on(`click`, ()=>{
            $productsBlock.addClass(`small-gap`)
            $productsBlock.empty()
            $backButton.removeClass(`none`)
            $(`#sort-options`).addClass(`none`)
            $productSpecsDiv.append(table)
            $productInfoDiv.append($productImg,$productPrice)
            $productContainer.append($productInfoDiv,$productSpecsDiv,$addToCart)
            $productsBlock.append($productName, $productContainer)
            $productsBlock.addClass(`product-page`)
            $productName.addClass(`bigger-text`)
        })
        $addToCart.on(`click`, async()=>{
            await addToCart(i._id)
        })
        $productDiv.append($productName)
        $productDiv.append($productImg)
        $productDiv.append($productPrice)
        $productsBlock.append($productDiv)
    }
}

const cartHandler = async()=>{
    const shoppingCart = await getShoppingCart()
    $cartBackButton.removeClass(`none`)
    $cartProductsContainer.empty()
    $cartPriceContainer.empty()
    let subtotal = 0
    let taxes = 0
    let total = 0
    

    for (let i of shoppingCart){
        const $cartProductDiv = $(`<div class="cart-product-div">`)
        const $cartProductImg = $(`<img class="cart-product-img">`)
        const $cartProductImgDiv = $(`<div class="cart-product-img-div">`)
        const $cartProductInfoDiv = $(`<div class="cart-product-info-div">`)
        const $cartProductName = $(`<h3 class="cart-product-name">`)
        const $cartProductPrice = $(`<h3 class="cart-product-price">`)
        $cartProductImg.attr(`src`, i.image)
        $cartProductName.html(i.name)
        $cartProductPrice.html( `$${i.price_num.toString()}`)
        $cartProductImgDiv.append($cartProductImg)
        $cartProductInfoDiv.append($cartProductName,$cartProductPrice)
        $cartProductDiv.append($cartProductImgDiv,$cartProductInfoDiv)
        $cartProductsContainer.append($cartProductDiv)
        subtotal += i.price_num

    }

    const $cartSubTotal = $(`<h4 class="cart-total">`)
    const $cartTaxes = $(`<h4 class="cart-total">`)
    const $cartTotal = $(`<h3 class="cart-total">`)
    const $cartTotalDelDiv = $(`<div class="cart-total-delete-div">`)
    const $cartDeleteImg = $(`<img class="cart-delete-img">`)
    $cartSubTotal.html(`Subtotal: $${subtotal}`)
    total = subtotal
    taxes = subtotal * 0.043
    total += taxes
    $cartTaxes.html(`Taxes: $${taxes}`)
    $cartTotal.html(`Total: $${total}`)
    $cartDeleteImg.attr(`src`,`./images/delete.png`)
    $cartTotalDelDiv.append($cartTotal, $cartDeleteImg)
    $cartPriceContainer.append($cartSubTotal, $cartTaxes, $cartTotalDelDiv)
    
}




const checkHandler = async()=>{
    const computers = await getComputers()
    const tablets = await getTablets()
    if (computersBox.checked){
        if (!tabletsBox.checked){
            console.log(`checked`)
            $productsBlock.empty()
            populate(computers)
        } else{
            $productsBlock.empty()
        }
    } else if (tabletsBox.checked){
        if(!computersBox.checked){
            console.log(`checked`)
            $productsBlock.empty()
            populate(tablets)
        } else {
            $productsBlock.empty()
        }
        
    } else {
        $productsBlock.empty()
        await populate(tablets)
        await populate(computers)
    }
    
}

$backButton.on(`click`, async()=>{
    const computers = await getComputers()
    const tablets = await getTablets()
    $productsBlock.empty()
    $productsBlock.removeClass(`small-gap`)
    populate(tablets)
    populate(computers)
    $(`#sort-options`).removeClass(`none`)
    checkHandler()
    $backButton.addClass(`none`)
})

computersBox.addEventListener(`click`, async()=>{
    await checkHandler()
})

tabletsBox.addEventListener(`click`, async()=>{
    await checkHandler()
})


// animation section

const scrollAnim = document.querySelectorAll('.animation')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
})


for (let i in scrollAnim) {
    const elements = scrollAnim[i]
    observer.observe(elements)
} 