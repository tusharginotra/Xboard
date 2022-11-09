function addAccordion() {
  let parent = document.getElementById("data");
  parent.innerHTML = `<div class="accordion mb-10 " id="accordionExample">
  <div class="accordion-item w-75">
    <h2 class="accordion-header" id="headingOne" >
      <button class="accordion-button"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Coronavirus
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div id="carousel1" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false" >
  <div class="carousel-inner">
     
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
  </div>


  <div class="accordion-item w-75">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        India Tech
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div id="carousel2" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false" >
  <div class="carousel-inner">
     
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel2" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel2" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
  </div>


  <div class="accordion-item w-75">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Sports star
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div id="carousel3" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false" >
  <div class="carousel-inner">
    
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel3" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel3" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
  </div>
</div>`;
  fetchData();
}
addAccordion();
async function fetchNews(url) {
  try {
    let res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );
    let data = await res.json();
    //console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

async function fetchData() {
  // const categories = ['indian','indiansports','indianpolitics']
  // magazines.forEach(async (magazine) => {
  //   let data = await fetchNews(magazine);
  //   console.log(data.items);
  //   getCarouselItems(data.items);

  // });
  for (let i = 0; i < magazines.length; i++) {
    let data = await fetchNews(magazines[i]);
    //console.log(data.items);
    getCarouselItems(data.items, `#carousel${i + 1}`);
  }

  //console.log(magazines);
}

function getCarouselItems(data, carouselid) {
  let parent = document.querySelector(`${carouselid} > div.carousel-inner`);
  let active = false;

  //console.log(data);
  data.map((news) => {
    let item = document.createElement("div");
    if (active === false) {
      item.setAttribute("class", "carousel-item active");
      active = true;
    } else item.setAttribute("class", "carousel-item");

    item.innerHTML = `
    <div class="card w-100 d-block">
  <a href=${news.link}><img src=${news.enclosure.link} style="width:100%;height:60vh;" class="card-img-top" alt="..."></a>
  <div class="card-body">
    <h2 class="card-title">${news.title}</h2>
    <p class="card-text mt-1" style="color:#586069;">${news.author} <i class="fa-solid fa-circle"></i>  ${new Date(news.pubDate).toLocaleDateString()}</p>
    <p class="card-text mt-1">${news.description}</p>
  </div>
</div>
`;
    parent.appendChild(item);
  });

  //console.log(parent);
}
//getCarouselItems();

// export {fetchData}
