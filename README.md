## Ticket Wallet - Order History

_An example "Order History" view implemented in React._

#### Quick Notes
After talking to Lucas, I made some changes to the input data to facilitate some improvements:

 1. Added a "ticket_quantity" attribute, so that information could be displayed to the user.
 2. Changed the dates on the events so that some would occur in the future and could be displayed under "Upcoming Events"
 3. Added 2 extra Ticket orders so that sorting orders could be demonstrated for both Upcoming and Past Events.

### How to Run

I used [Yarn](https://yarnpkg.com/) for package management. If you already have that installed (or [don't mind installing it](https://yarnpkg.com/lang/en/docs/install/)), you can use the following steps to clone, setup, and run this web app.
_(Alternately, you can just download the zipped repo, extract it, and open a terminal window in the repo's root directory before proceeding with steps 3-5)_
```
git clone https://github.com/nklein/ticket-wallet.git
cd ticket-wallet/
yarn add
yarn start
open http://localhost:8080
```


If you're dead-set against installing Yarn, NPM (>v2.0) _**may**_ also work, if you'd rather do that, here's what to do:
```
git clone https://github.com/nklein/ticket-wallet.git
cd ticket-wallet/
npm install
npm start
open http://localhost:8080
```
