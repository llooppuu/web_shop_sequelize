# web_shop_sequelize

Lihtne veebipoe API, mis kasutab Node.js-i, Expressi, Sequelize'i ja MySQL-i.

## Mida vaja on

- Node.js
- npm
- MySQL

## Projekti käivitamine

Kõigepealt paigalda paketid:

```bash
npm install
```

Seejärel loo MySQL-is andmebaas:

```sql
CREATE DATABASE web_shop;
```

Andmebaasi ühenduse seaded on failis `config/database.js`.
Praegu on seal kasutaja `root` ja parool on tühi:

```js
const sequelize = new Sequelize('web_shop', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
```

Kui sinu MySQL-is on teine kasutaja või parool, siis muuda need seal ära.

Rakenduse saab käima panna käsuga:

```bash
node index.js
```

Kui kõik on korras, siis töötab server aadressil:

```text
http://localhost:3000
```

## Märkus andmebaasi kohta

`index.js` failis kasutatakse praegu:

```js
.sync({ force: true })
```

See tähendab, et serveri käivitamisel luuakse tabelid uuesti. Kui andmebaasis olid enne mingid andmed, siis need kustutatakse ära.

## Mõned testimiseks vajalikud aadressid

Tooted:

```text
GET  /products
GET  /product/:productId
```

Admini toodete haldus:

```text
GET  /admin/products
GET  /admin/product/:productId
POST /admin/add-product
POST /admin/product/edit/:productId?edit=true
POST /admin/product/delete/:productId
```

Ostukorv:

```text
GET  /cart
POST /cart
POST /cart-delete-item
```

Tellimused:

```text
GET  /orders
POST /create-order
```

Näide toote lisamiseks:

```json
{
  "title": "Test product",
  "price": 19.99,
  "imageUrl": "https://example.com/image.jpg",
  "description": "Product description"
}
```

Näide toote ostukorvi lisamiseks või eemaldamiseks:

```json
{
  "productId": 1
}
```
