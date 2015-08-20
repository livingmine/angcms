Prerequisite
1. Install Node.js -> http://nodejs.org/
2. Install MongoDB -> http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
3. Selesai instalasi, masuk ke folder bin MongoDB lalu execute mongod(buat listening)
4. Di folder yang sama, execute mongo, terus ketik 'use angcms' (angcms nama database yang gw buat)
5. Selesai urusan database, buka terminal, pindah ke dalem folder angcms, di root ketik 'npm start'
6. Kalau gak error, berarti server is listening at http://localhost:3000/

API - File routing ada di angcms\routes\api.js
1. GET - localhost:3000/api/trainings | See all trainings
2. POST - localhost:3000/api/trainings/add | Add training
3. POST - localhost:3000/api/trainings/update | Update training
4. GET - localhost:3000/api/trainings/delete/<id> | Delete training based on its id
5. GET - localhost:3000/api/trainings/details/<id> | Training details of a training with particular id

Bisa pakai postman(chrome-extension) kalau mau ngetest APIs di atas.

Schema of Training
var Training = new Schema({
	title: String,
	description: String,
	speaker: String,
	date: Date
});


