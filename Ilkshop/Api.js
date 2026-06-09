import axios from "axios";

async function getCategory(){
    const res = await axios.get('https://69c575978a5b6e2dec2c85a6.mockapi.io/product/category')
    return res.data
}
async function getProduct(){
    const res = await axios.get('https://69c575978a5b6e2dec2c85a6.mockapi.io/product/product')
    return res.data
}

export default {getCategory,getProduct}