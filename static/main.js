"use strict";

class Profile {
    constructor({ username, name: { firstName, lastName }, password }){
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser({ username: this.username, password: this.password }), (err, data) => {
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
    const Ivan = new Profile({
                username: 'ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'ivanspass',
            });

    const Maria = new Profile({
                username: 'maria',
                name: { firstName: 'Maria', lastName: 'Ivanova' },
                password: 'mariaspass',
            });

    Ivan.createUser((err, data) => {
        if (err) {
            console.log(`regitration error ${ivan.createUser}`); // text
        } else {
            console.log(`user ${ivan.createUser} created`); // text

            Ivan.performLogin((err, data) => {
                if (err) {
                    console.log(`error with log-in ${ivan.performLogin}`);
                } else {
                    console.log(`successful log-in ${ivan.performLogin}`);

                        Ivan.addMoney({ currency: 'RUB', amount: 500000 }, (err, data) => {
                            if (err) {
                                console.log(`Error during adding money to ${ivan.username}`);
                            } else {
                                console.log(`Added ${amount} ${currency} to ${ivan.username}`);

                                ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NTC', targetAmount: targetAmount}, (err, data) => {
                                    if (err) {
                                        console.log('exchange error');
                                    } else {
                                        console.log(`successful exchange ${currency} to NTC`);

                                        maria.createUser((err, data) => {
                                            if (err) {
                                                console.log(`regitration error ${maria.createUser}`); 
                                            } else {
                                                console.log(`user ${maria.createUser} created `); 

                                                ivan.transferMoney({ to: maria.username, amount: targetAmount}, (err, data) => {
                                                    if (err) {
                                                        console.log(`transfer error`);
                                                    } else {
                                                        console.log(`successful transfer to ${maria.username}`);
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