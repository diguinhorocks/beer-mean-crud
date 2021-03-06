/**
 * MongoDB
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '', unique: true },
  hash_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  age: { type: Number, min: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: '' }
});

var User = mongoose.model('User', UserSchema);

exports.list = function(req, res){

	User.find(function (err, users) {
		if(err) {
			console.log(err);
		} else {
			res.send(users)
			res.end();
		}
	})
};

exports.add = function(req, res) {
	var dados = req.body;

	var user = new User(dados);

	user.save(function(err) {
		if(err){
			console.log(err);
		} else {
			console.log('Não foi cadastrado, tente novamente');
		}
	});

	res.end();
};

exports.viewAdd = function(req, res) {
	res.status(200);
	res.set('Content-Type', 'text/html');
	res.render('/users/create', function(err, html) {
		if(err)
			console.log('error', err);
		console.log(html);
		res.write(html);
	});
};

exports.edit = function(req, res){
	var result = req.body;

	User.update({_id: req.params.id}, result, function(err, beer) {
		if(err) {
			console.log(err);
		} else {
			console.log('Usuário atualizado com sucesso');
		}
	});

	res.end();
};

exports.remove = function(req, res) {
	var result = req.body;

	User.remove({_id: req.params.id}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('Usuário deletado com sucesso');
		}
	});

	res.end();
};