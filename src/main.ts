import './scss/styles.scss';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { ApiModel } from './components/Models/ApiModel';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

// Тест класса Catalog
const catalog = new Catalog();

catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getItems());

const firstProduct = catalog.getItems()[0];
console.log('Товар по id:', catalog.getItem(firstProduct.id));

console.log('Товар не найден:', catalog.getItem('nonexistent-id'));

catalog.setSelected(firstProduct);
console.log('Выбранный товар:', catalog.getSelected());

// Тест класса Cart
const cart = new Cart();

console.log('Пустая корзина:', cart.getItems());
console.log('Количество в пустой корзине:', cart.getCount());
console.log('Сумма пустой корзины:', cart.getTotal());

cart.add(firstProduct);
console.log('После добавления товара:', cart.getItems());
console.log('Количество:', cart.getCount());
console.log('Сумма:', cart.getTotal());

const secondProduct = catalog.getItems()[1];
cart.add(secondProduct);
console.log('После добавления второго товара:', cart.getItems());
console.log('Количество:', cart.getCount());
console.log('Сумма:', cart.getTotal());

// Повторное добавление того же товара
cart.add(firstProduct);
console.log('После повторного добавления (не должно дублировать):', cart.getCount());

// Проверка наличия товара
console.log('Товар есть в корзине:', cart.hasItem(firstProduct.id));
console.log('Товара нет в корзине:', cart.hasItem('nonexistent-id'));

// Удаление товара
cart.remove(firstProduct);
console.log('После удаления товара:', cart.getItems());
console.log('Количество:', cart.getCount());

// Очистка корзины
cart.clear();
console.log('После очистки корзины:', cart.getItems());

// Тест класса Buyer
const buyer = new Buyer();

console.log('Данные покупателя по умолчанию:', buyer.getData());

buyer.setData({ address: 'ул. Пушкина, д. 10' });
console.log('После сохранения адреса:', buyer.getData());

buyer.setData({ payment: 'card', email: 'test@mail.ru', phone: '+79991234567' });
console.log('После сохранения всех данных:', buyer.getData());

// Обновление только одного поля
buyer.setData({ phone: '+79997654321' });
console.log('После обновления телефона:', buyer.getData());

// Валидация с ошибками
buyer.clear();
console.log('После очистки данных покупателя:', buyer.getData());
const errors = buyer.validate();
console.log('Ошибки валидации (пустые данные):', errors);

// Валидация без ошибок
buyer.setData({ payment: 'card', email: 'test@mail.ru', phone: '+79991234567', address: 'ул. Пушкина, д. 10' });
const validResult = buyer.validate();
console.log('Валидация (все данные заполнены):', validResult);

// Тест ApiModel
const api = new Api(API_URL);
const apiModel = new ApiModel(api);

apiModel.getProducts().then(response => {
    console.log('Ответ сервера (всего товаров):', response.total);
    catalog.setItems(response.items);
    console.log('Каталог из сервера:', catalog.getItems());
}).catch(err => {
    console.error('Ошибка при получении товаров:', err);
});

