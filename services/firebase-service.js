'use strict';
/*
    Name: FirebaseService
    Author: Émerson Henrique de Oliveira
    GitHub: https://github.com/emersoneho
    Version: 0.0.2
*/

import database from '../assets/js/firebase-config.js';

const firebaseFactory = {
    create: async (endpoint, ...data) => {
        let newKey = await database.ref().child(endpoint).push().key;
        const response = await database.ref(`${endpoint}/${newKey}`).set(data);
        debugger;
        return response;
    },
    read: async (endpoint) => {
        const response = await database.ref(endpoint).once('value');
        await response.snapshot;
        return response.val();
    },
    readID: async (endpoint, id) => {
        const response = await database.ref(`${endpoint}/${id}`).once('value');
        await response.snapshot;
        return response.val();
    },
    readRealTime: (endpoint) => {
        return new Promise((resolve, reject) => {
            database.ref(endpoint).on('value', (snapshot) => {
                resolve(snapshot.val());
            }, (error) => {
                reject(error)
            });
        });
    },
    update: async (endpoint, id, ...data) => {
        const response = await database.ref(`${endpoint}/${id}`).set(data, error => {
            return !error;
        });
        return response;
    },
    deleteID: async (endpoint, id) => {
        const response = await database.ref(`${endpoint}/${id}`).remove(error => {
            return !error;
        });
        return response;
    }

}
export default firebaseFactory;