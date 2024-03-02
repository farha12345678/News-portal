const loadCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await response.json()

    const buttonContainer = document.getElementById('button-container')
    data.data.news_category.forEach((item) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button onclick="loadNews('${item.category_id}')" class="btn btn-ghost mx-4 border border-gray-600 bg-white  text-xl">${item.category_name}</button>
        
        `
        buttonContainer.appendChild(div)
    });

}

const loadNews = async (catId) => {
    document.getElementById('loading-spanner').classList.remove('hidden')
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
    const data = await response.json()
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ""
    data.data.forEach((item) => {
        document.getElementById('loading-spanner').classList.add('hidden')
        const div = document.createElement('div')
        div.innerHTML = `
        <div   class="card lg:card-side bg-base-100 shadow-xl w-[700px] my-5 mx-20">
                <figure><img src="${item.image_url}" alt="Album" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${item.title}</h2>
                   
                   
                    <p>${item.details.slice(0,100)}</p>
                    <div class="card-actions justify-end">
                    <p>${item.rating.badge}<sup>${item.rating.number}</sup></p>
                    <button class="btn btn-primary">Details</button>
                </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div)
    })
}

const handleSearch = () => {
    const value = document.getElementById('search-field').value;
    if(value){
loadNews(value)
    }
    else{
        alert("Please enter valid Id")
    }
}



loadNews("01")





loadCategory();