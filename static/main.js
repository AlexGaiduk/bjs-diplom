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