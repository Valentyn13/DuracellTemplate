const BOT_TOKEN = "6785310463:AAFxVzPCdeRejfUFeeor1vyTvPXBf2BUYLA";
const CHAT_URL = "@testOrdersGroup";

const API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const submitForm = async (event) => {
  event.preventDefault();
  const form = event.target;
  let cartItems =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];
  let totalPrice = 0;
  const formData = new FormData(form);
  const { name, phone, city, office } = Object.fromEntries(formData.entries());

  let text = ` --------Заявка--------\n Имя: ${name}\n Телефон: ${phone}\n Город:${
    city || "Не указан"
  }\n Отделение Новой почты: ${office || "Не указано"} \n\n`;

  cartItems.forEach((elem) => {
    const productsPrice = elem.price * elem.amount;
    totalPrice += productsPrice;
    text += `Товар: \n${elem.name} \nКол-во: ${elem.amount}\nЦена за 1 шт: ${elem.price}\n\n`;
  });
  text += `Всего:${totalPrice.toFixed(2)}`;


  if (cartItems.length !== 0) {
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                chat_id:CHAT_URL,
                text
            })
        })
  
        if(!response.ok) {
            throw new Error(response.statusText)
        }
  
        form.reset()
        console.log(text);
  
      } catch (error) {
        console.error(error)
      }
  } else {
    console.log('Forbiden')
  }

};
