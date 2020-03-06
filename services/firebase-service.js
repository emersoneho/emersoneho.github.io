const firebaseService = {
    create: (endpoint, data) => {
        let newKey = database.ref().child(endpoint).push().key;
        database.ref(endpoint + '/' + newKey).set(data, (error) => {
            if (error) {
                console.log('error on create data');
            } else {
                console.log('create data ok');
            }
        });
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
    read: (endpoint) => {
        return new Promise((resolve, reject) => {
            database.ref(endpoint).once('value', (snapshot) => {
                resolve(snapshot.val());
            }, (error) => {
                reject(error)
            });
        });
    },
    readID: (endpoint, id) => {
        database.ref(endpoint + '/' + id).on('value', (snapshot) => {
            console.log(snapshot.val());
        });
    },
    update: (endpoint, id, ...data) => {
        database.ref(endpoint + '/' + id).set(data, (error) => {
            if (error) {
                console.log('error on update data');
            } else {
                console.log('Update data ok');
            }
        });
    },
    deleteID: (endpoint, id) => {
        database.ref(endpoint).set(data, (error) => {
            if (error) {
                console.log('error on delete data');
            } else {
                console.log('delete data ok');
            }
        });
    }
}