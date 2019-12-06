"use strict";
class Profile {
    constructor({ username, name: { firstName, lastName }, password }){
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password }, (err, data) => {
            console.log(`user ${this.username} registered`);
            callback(err, data);
        });
    }

    performLogin(callback) {
        return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
            console.log(`user ${this.username} logged in`);
            callback(err, data);
        });
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);  
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Convert ${fromCurrency} in ${targetAmount} ${targetCurrency} `);
            callback(err, data);  
        });
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfer ${amount} NETCOIN to ${to}`); 
            callback(err, data);  
        });
    }    
}




function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Get stocks info`);
        callback(err, data);  
    });
}

function main () {

    const Ivan = new Profile({
                username: 'Ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'Ivanspass',
            });

    const Maria = new Profile({
                username: 'Maria',
                name: { firstName: 'Maria', lastName: 'Ivanova' },
                password: 'Mariaspass',
            });

    const coinAmount = { currency: 'EUR', amount: 5000 };

    getStocks((err, data) => {
        if (err) {
            console.log('error with get stocks info');
        }

        const stocksInfo = data[99];

            Ivan.createUser((err, data) => {
                if (err) {
                    console.log(`regitration error ${Ivan.username}`); // text
                } else {
                    console.log(`user ${Ivan.username} created`); // text

                    Ivan.performLogin((err, data) => {
                        if (err) {
                            console.log(`error with log-in ${Ivan.username}`);
                        } else {
                            console.log(`successful log-in ${Ivan.username}`);

                                Ivan.addMoney(coinAmount, (err, data) => {
                                    if (err) {
                                        console.log(`Error during adding money to ${Ivan.username}`);
                                    } else {
                                        console.log(`Added ${coinAmount.amount} ${coinAmount.currency} to ${Ivan.username}`);

                                        const convertCoin = stocksInfo['EUR_NETCOIN'] * coinAmount.amount;

                                        Ivan.convertMoney({ fromCurrency: coinAmount.currency, targetCurrency: 'NETCOIN', targetAmount: convertCoin }, (err, data) => {
                                            if (err) {
                                                console.log('exchange error');
                                            } else {
                                                console.log(`successful exchange ${coinAmount.amount} ${coinAmount.currency} to ${convertCoin} NETCOIN`);

                                                Maria.createUser((err, data) => {
                                                    if (err) {
                                                        console.log(`regitration error ${Maria.username}`); 
                                                    } else {
                                                        console.log(`user ${Maria.username} created `); 

                                                        Ivan.transferMoney({ to: Maria.username, amount: convertCoin }, (err, data) => {
                                                            if (err) {
                                                                console.log(`transfer error`);
                                                            } else {
                                                                console.log(`successful transfer ${convertCoin} NETCOIN to ${Maria.username}`);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                        }
                    });
                }
            });
        });

} // main

main();
