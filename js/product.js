// const products = {

//     1: {
//         name: "دوره آموزش فتوشاپ",
//         category: "آموزش طراحی و گرافیک",
//         price: 2496000,
//         image: "../asset/دوره-آموزش-فتوشاپ-قلموم-768x768.jpg",
//         brand: "Ps",
//         description: "دوره آموزش فتوشاپ برای یادگیری طراحی و گرافیک حرفه‌ای."

//     },

//     2: {
//         name: "دوره آموزش فیگما",
//         category: "طراحی رابط کاربری و محصول",
//         price: 4750000,
//         image: "../asset/دوره-آموزش-فیگما-قلموم-1-768x768.jpg",
//         brand: "Fg",
//         description: "دوره آموزش فیگما برای طراحی رابط کاربری و طراحی محصول."
//     },

//     3: {
//         name: "دوره آموزش ایندیزاین",
//         category: "صفحه‌آرایی حرفه‌ای برای چاپ و نشر",
//         price: 3496000,
//         image: "../asset/2.jpg",
//         brand: "Id",
//         description: "دوره آموزش ایندیزاین برای صفحه‌آرایی حرفه‌ای در چاپ و نشر."
//     },

//     4: {
//         name: "دوره آموزش ایلاستریتور",
//         category: "وکتور و طراحی گرافیک حرفه‌ای",
//         price: 4622000,
//         image: "../asset/1.jpg",
//         brand: "Ai",
//         description: "دوره آموزش ایلاستریتور برای یادگیری طراحی وکتور و گرافیک حرفه‌ای."
//     }

// };


// var mahsol = "";


// // ساخت کارت محصولات
// for (const id in products) {

//     const product = products[id];

//     mahsol += ` 
//         <div class="col-12 col-md-6 col-lg-3">

//             <div class="card_product p-2">

//                 <div class="car_img_cont">

//                     <img 
//                         src="${product.image}" 
//                         class="img-fluid rounded-4 w-100 image_card"
//                         alt="${product.name}"
//                     >

//                     <div class="car_img_cont_small d-flex center m-0">

//                         <span class="align-self-center d-flex">
//                             ${product.brand}
//                         </span>

//                     </div>

//                 </div>


//                 <div class="p-3 text-end mt-3">

//                     <h5 class="text-white title">
//                         ${product.name}
//                     </h5>

//                     <p class="line_1">
//                         ● ${product.category}
//                     </p>


//                     <div class="d-flex justify-content-between text-secondary">

//                         <span>◷ ۱۵ ساعت</span>

//                         <span>▱ ۲۵ درس</span>

//                     </div>


//                     <div class="border-top mt-3 pt-3">

//                         <small class="text-secondary">
//                             هزینه ثبت‌نام
//                         </small>

//                         <h5 class="text-white">
//                             ${product.price.toLocaleString('fa-IR')} تومان
//                         </h5>

//                     </div>


//                     <div class="d-flex">

//                         <div>

//                             <button 
//                                 class="btn login-btn"
//                                 onclick="addtocart(${id})"
//                             >
//                                 +
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     `;
// }


// // نمایش محصولات
// document.getElementById("product").innerHTML = mahsol;



// // سبد خرید
// var naghdarande = [];
// showallid()
// // اضافه کردن محصول به سبد
// function addtocart(proid) {

//     console.log("ID محصول:", proid);

//     var produc = products[proid];

//     console.log("محصول:", produc);

//     naghdarande.push(proid);

//     showallid();
// }


// function removeFromCart(id) {
//     console.log("in id pak khahad shod" + id)
//     naghdarande.pop(id);
//     showallid();
// }

// function bill(price) {
//     console.log("in id pak khahad shod" + id)
//     naghdarande.pop(id);
//     showallid();
// }

// function showallid() {
//     var sum_price = 0;
//     var card_html = "";

//     if (naghdarande.length === 0) {

//         card_html = `
//             <div class="col-12 text-center text-white py-4">
//                 <p class="mb-0">
//                     سبد خرید شما خالی است
//                 </p>
//             </div>
//         `;

//     } else {

//         naghdarande.forEach(function (proid) {

//             var product = products[proid];

//             sum_price += Number(product.price);

//             card_html += `
//                 <div class="d-flex justify-content-between align-items-center col-12 py-2">

//                     <!-- عکس -->
//                     <div class="col-3 d-flex justify-content-end">
//                         <img 
//                             class="img-fluid shopping_cart_menu_img rounded-3"
//                             src="${product.image}"
//                             alt="${product.name}"
//                         >
//                     </div>

//                     <!-- اطلاعات محصول -->
//                     <div class="col-8 text-end px-2">

//                         <h3 class="font_17 text-white mb-2">
//                             ${product.name}
//                         </h3>

//                         <p class="font_14 text_color_sec mb-0">
//                             ${Number(product.price).toLocaleString('fa-IR')} تومان
//                         </p>

//                     </div>

//                     <!-- حذف -->
//                     <div class="col-1 text-center">

//                         <button 
//                             type="button"
//                             class="btn text-white fs-4"
//                             onclick="removeFromCart(${proid})"
//                         >
//                             −
//                         </button>

//                     </div>

//                 </div>
//             `;
//         });
//     }

//     // بعد از جمع قیمت‌ها bill ساخته میشه
//     var bill = `
//         <div class="col-12 d-flex border-top mt-2 pt-3">
//             <div class="col-6 d-flex justify-content-start text-white">
//                 مجموع
//             </div>

//             <div class="col-6 d-flex justify-content-end text-white">
//                 تومان ${sum_price.toLocaleString('fa-IR')}
//             </div>
//         </div>
//     `;

//     document.getElementById("shopping_cart_menu").innerHTML =
//         card_html + bill;

//     console.log("مجموع قیمت:", sum_price);
//     console.log("محصولات داخل سبد:", naghdarande);
// }

// var status_shopping_cat = false

// function set_status() {
//     console.log("asdasdasd")
//     if (status_shopping_cat === false) {
//         console.log("1")

//         status_shopping_cat = true
//         document.getElementById("shopping_cart_menu").classList.remove("hide")

//         document.getElementById("shopping_cart_menu").classList.add("show")

//     }
//     else {
//         console.log("2")

//         status_shopping_cat = false
//         document.getElementById("shopping_cart_menu").classList.remove("show")

//         document.getElementById("shopping_cart_menu").classList.add("hide")

//     }
// }