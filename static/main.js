"use strict";

class Profile {
    constructor({ username, name: { firstName, lastName }, password }){
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password }), (err, data) => {
            console.log(`user ${this.username} registered`);
            callback(err, data);
        }
    }

    performLogin(callback) {
        return ApiConnector.performLogin({ username: this.username, password: this.password }), (err, data) => {
            console.log(`user ${this.username} logged in`);
            callback(err, data);
        }
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);  
        })
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Convert ${fromCurrency} in ${targetAmount} ${targetCurrency} `);
            callback(err, data);  
        })
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfer ${amount} ntc to ${to}`); //ntc - netcoin:)
            callback(err, data);  
        })
    }    
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Get stocks info`);
        callback(err, data);  
    })
}

function main () {

    let stocksInfo; 
    getStocks((err, data) => {
      if (err) {
        console.log('error with get stocks info');
    }
    stocksInfo = [99];
    });

    let coinAmaunt = 500000;

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

    Ivan.createUser((err, data) => {
        if (err) {
            console.log(`regitration error ${Ivan.createUser}`); // text
        } else {
            console.log(`user ${Ivan.createUser} created`); // text

            Ivan.performLogin((err, data) => {
                if (err) {
                    console.log(`error with log-in ${Ivan.performLogin}`);
                } else {
                    console.log(`successful log-in ${Ivan.performLogin}`);

                        Ivan.addMoney({ currency: 'RUB', amount: coinAmaunt }, (err, data) => {
                            if (err) {
                                console.log(`Error during adding money to ${Ivan.username}`);
                            } else {
                                console.log(`Added ${amount} ${currency} to ${Ivan.username}`);

                               const convertCoin = coinAmaunt * stocksInfo;

                                Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NTC', targetAmount: convertCoin}, (err, data) => {
                                    if (err) {
                                        console.log('exchange error');
                                    } else {
                                        console.log(`successful exchange ${currency} to NTC`);

                                        Maria.createUser((err, data) => {
                                            if (err) {
                                                console.log(`regitration error ${Maria.createUser}`); 
                                            } else {
                                                console.log(`user ${Maria.createUser} created `); 

                                                Ivan.transferMoney({ to: Maria.username, amount: convertCoin}, (err, data) => {
                                                    if (err) {
                                                        console.log(`transfer error`);
                                                    } else {
                                                        console.log(`successful transfer to ${Maria.username}`);
                                                    }
                                                })    
                                            }
                                        })
                                    }
                                })
                            }
                        })
                }
            })
        }
    })
} // main


main();