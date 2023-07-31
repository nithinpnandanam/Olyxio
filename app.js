const getData = () => {
  fetch("testimonial.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let testimonial = data["testimonial"];
      testimonial.forEach((testObj) => {
        let parent = document.getElementById("testimonials");
        let div1 = document.createElement("div");
        div1.setAttribute("class", "testi");
        div1.innerHTML = `<div class="testi_image_designation">
                                <div>
                                    <img src="${testObj.image}" alt="" />
                                </div>
                                <div class="name_designation_div">
                                    <h4 class="image_name">${testObj.name}</h4>
                                    <p class="image_designation">${testObj.designation}</p>
                                </div>
                            </div>
                            <p class="test_para">
                                ${testObj.description}
                            </p>
                          </div>`;
        parent.appendChild(div1);
      });
      // Hamberger menu 
      hamMenu = document.getElementById("ham_menu");
      hamMenu.addEventListener("click", () => {
        document.getElementById("pop_up").style.display = "block";
      });

      // Close Button
      close_button = document.getElementById("close_button");
      close_button.addEventListener("click", () => {
        document.getElementById("pop_up").style.display = "none";
      });

      // Loading Main li
      let sideMenu = data["sideMenu"];
      sideMenu.forEach((testObj, index) => {
        let parent = document.getElementById("main_u_li");
        let pop_up = document.createElement("li");
        pop_up.setAttribute("class", "main_li");

        let icon = document.createElement("i");
        icon.setAttribute(
          "class",
          "fa-solid fa-circle-chevron-down arrowDownIcon"
        );
        let listContainer = document.createElement("ul");
        listContainer.className = "sub_li hiddens";
        listContainer.dataset.menuId = testObj.mainmenu;
        let anchorTag = document.createElement("a");
        anchorTag.className = "myAnchor";
        const textContent = document.createTextNode(`${testObj.mainmenu}`);
        anchorTag.appendChild(textContent);

        // Adding arrowkeys to main list items
        if (testObj.subMenu.length === 0) {
          if(testObj.mainmenu==="Blog"){
            anchorTag.href=testObj.Link
          }else{
            anchorTag.href=testObj.Link
          }
        } else {
          anchorTag.appendChild(icon);
        }
        pop_up.appendChild(anchorTag);

        // creating Unordered list
        let count_li = 0;
        while (count_li <= testObj["subMenu"].length - 1) {
          testObj["subMenu"].forEach((x) => {
            let listItemChild = document.createElement("li");
            let listItemAnchor = document.createElement("a");
            listItemAnchor.innerHTML = `${Object.keys(x)[0]}`;
            listItemAnchor.href = Object.values(x)[0];
            listItemChild.appendChild(listItemAnchor);
            count_li++;
            listContainer.appendChild(listItemChild);
          });
        }

        // loading subli for each main li when clicled
        anchorTag.addEventListener("click", (event) => {
          let dropDown = anchorTag.nextElementSibling;
          if (Object.values(dropDown.classList).includes("hiddens")) {
            dropDown.classList.remove("hiddens");
            anchorTag.style.color = "#e62552";
            anchorTag.getElementsByTagName("i")[0].classList.add("fa-rotate-180")
            anchorTag.getElementsByTagName("i")[0].style.paddingRight="10px";
           
          } else {
            dropDown.classList.add("hiddens");
            anchorTag.style.color = "#0d093e";
            anchorTag.getElementsByTagName("i")[0].classList.remove("fa-rotate-180")
          }
        });

        pop_up.appendChild(listContainer);
        parent.appendChild(pop_up);

      });
    });
};
getData();

// JS for location page

const getDataLocation = () => {
  fetch("location.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countries(data)
      localStorage.setItem("locationData", JSON.stringify(data));
    });
    

};

getDataLocation();

// function for getting all the countries in the header
let countries = (data)=>{
  let country_header= document.getElementById("country_header")
  let H1=document.createElement("h1")
  H1.innerHTML="WHERE WE ARE"
  country_header.appendChild(H1)
  let heading_un_li = document.createElement("ul");
  let initialData=data.find((location)=>location.unique_id==="c4")
  data.forEach((testObj) => {
    let heading_list_item = document.createElement("li");
    let heading_button = document.createElement("button");
    heading_button .setAttribute("onclick",button_fn);
    heading_button .onclick= ()=> button_fn(data);
    heading_button.innerHTML=`${testObj.country}`;
    heading_list_item.appendChild(heading_button)
    heading_un_li.appendChild(heading_list_item)
  });
  country_header.appendChild(heading_un_li)
  eachCountry(initialData)
  initial_image_fn_new(data)
}

//   function for button
function button_fn(data){
  // console.log(event.target)
  data.forEach((test_obj)=>{
    if(test_obj.country===event.target.innerHTML){
      eachCountry(test_obj)
      event.target.setAttribute("data-office_initial_img",`${test_obj.location[0].locationImage}`)
      initial_image_fn(event.target)
    }
  })
}

function eachCountry(data_object){
  let main= document.getElementById("main");
  let continent = document.createElement("section");
  continent.setAttribute("id", "continent");
  let all_places = document.createElement("section");
  all_places.setAttribute("id","all_places")
  all_places.setAttribute("onmouseout","mouse_fn_out_new()")
  let all_places_image = document.createElement("section");
  
  all_places_image.setAttribute("id","all_places_image")
      data_object.location.forEach((x,index)=>{
        let div1=document.createElement("div");
        // if(index===0){
        //   div1.style.border="1px dashed rgb(226, 41, 47)"
        //   div1.style.borderRadius= "10px";
        // }
        div1.setAttribute("onmouseover","mouse_fn_over(this)")
        div1.setAttribute("onmouseout","mouse_fn_out(this)")
        div1.setAttribute("data-officeimg",`${x.locationImage}`)
        // div1.onmouseover= ()=> mouse_fn();
        div1.className = "common_container";
        let div1_h3=document.createElement("h3");
        div1_h3.innerHTML=`${x.place}`
        div1.appendChild(div1_h3)
        Object.keys(x.address).forEach((y)=>{
          let div1_p1=document.createElement("p");
          div1_p1.innerHTML=`${x.address[y]}`
          div1.appendChild(div1_p1)
        })
        let div1_p2=document.createElement("p");
        div1_p2.setAttribute('class',"phone")
        if(x.hasOwnProperty("phoneNumber")){
          div1_p2.innerHTML=`<i class="fa-sharp fa-solid fa-phone"></i> ${x.phoneNumber}`
          div1.appendChild(div1_p2)
        }
        let div1_p3=document.createElement("p");
        div1_p3.setAttribute('class',"map")
        div1_p3.innerHTML=`<i class="fa-solid fa-location-dot"> ${x.location}`
        div1.appendChild(div1_p3)
        all_places.appendChild(div1)
      })
  
      continent.appendChild(all_places)
      main.replaceChildren(continent)
      continent.appendChild(all_places_image)
} 
// MouseOver fn
let mouse_fn_over=(div1)=>{
  // const location = JSON.parse(localStorage.getItem("locationData"));
  div1.style.border="1px dashed rgb(226, 41, 47)"
  div1.style.borderRadius= "10px";
  let image = document.createElement('img')
  image.src=div1.dataset.officeimg
  all_places_image.replaceChildren(image)
}
//   MouseOut fn
let mouse_fn_out=(div1)=>{
  div1.style.border="none"
}
//   MouseOut fn new
let mouse_fn_out_new=()=>{
  let image = document.createElement('img')
  let a = document.getElementById("all_places")
  image.src=a.getElementsByClassName("common_container")[0].dataset.officeimg
  all_places_image.replaceChildren(image)
}
//Initial Image loading fn
let initial_image_fn=(e)=>{
  let image = document.createElement('img')
  image.src=e.dataset.office_initial_img
  all_places_image.replaceChildren(image)
}

let initial_image_fn_new=(data)=>{
  data.forEach((x)=>{
    if(x.unique_id==="c4"){
      let image = document.createElement('img')
      image.src=x.location[0].locationImage
      all_places_image.replaceChildren(image)
    }
  })

}
