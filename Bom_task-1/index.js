let container=document.getElementById("container")
let btn_container=document.getElementById("btn-container")
async function getData()
{
    try
    {
        let response=await fetch("https://fakestoreapi.com/products")
        if(!response.ok)
        {
            throw new Error("HTTP Error",response.status)
        }
        
        let result=await response.json()
        localStorage.setItem("products",JSON.stringify(result))
        let data=JSON.parse(localStorage.getItem("products"))
        
       displayData(data)
    }
    catch(err)
    {
        console.error(err)
    }
}
function displayData(products)
{
    container.innerHTML=``
    if(products==null)
    {
        container.innerHTML=`no data available`
    }
    else
    {
        displayButtons()
        products.forEach(ele=>
        {
            let item=document.createElement("div")
            let{image,title,price,category}=ele
            item.innerHTML=`
            <img src=${image}>
            <p>${title}</p>
            <p>${price}</p>
            <p>${category}</p>
            `
            container.appendChild(item)
        }
        )
    }
}
function displayButtons()
{
    btn_container.innerHTML=``
    let data=JSON.parse(localStorage.getItem("products"))
   let catArr= Array.from(new Set(data.map(ele=>ele.category)))
   catArr.forEach(ele=>
   {
    let button=document.createElement("button")
    button.innerHTML=ele
    btn_container.appendChild(button)
    button.addEventListener("click",function()
    {
        filterData(ele)
    })
   }
   )

}
function filterData(category)
{
    let data=JSON.parse(localStorage.getItem("products"))
   let filter= data.filter(ele=>ele.category==category)
   displayData(filter)
}
getData()