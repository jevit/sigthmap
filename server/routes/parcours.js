var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
//mongodb://<dbuser>:<dbpassword>@ds147304.mlab.com:47304/heroku_5ccg3786
//localhost:27017
//ds147304.mlab.com:47304
var server = new Server('ds147304.mlab.com', 47304, {auto_reconnect: true});
db = new Db('heroku_5ccg3786', server);

/* Lancer au démarrage de l'application */
db.open(function(err, db) {
	if(!err) {
		db.authenticate('parcours', 'admin', function(err, res) {
			if(!err) {
				console.log("Connected to 'parcours' database");
				db.collection('parcours', {strict:true}, function(err, collection) {
					if (err) {
						console.log("The 'parcours' collection doesn't exist. Creating it with sample data...");
						populateDB();
					}
				});
			}else{
				console.log(err);
			}
		});
	}else{
		console.log(err);
	}
});


var self = module.exports = {
	/* Retourne un objet */
	findById : function(req, res) {
		var id = req.params.id;
		console.log('Retrieving parcours: ' + id);
		db.collection('parcours', function(err, collection) {
			console.log(id);
			collection.find({'_id':new mongo.ObjectID(id)}).limit(1).next(
			function(err, item){
				res.send(item);
			});
		});
	},

	/* Retourne tous les objets */
	findAll : function(req, res) {
		db.collection('parcours', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	},

	/* Ajoute une donnée */
	add : function(req, res) {
		var parcours = req.body;
		if(!(parcours._id == "" || parcours._id == null || parcours._id == undefined)){
			console.log('UPDATE '+ new mongo.ObjectID(parcours._id ));
			self.update(req, res);
		}
		else{
			console.log('ADD');
			parcours._id = new mongo.ObjectID();
			console.log('Adding parcours: ' + JSON.stringify(parcours));
			db.collection('parcours', function(err, collection) {
				collection.insert(parcours, {safe:true}, function(err, result) {
					if (err) {
						res.send({'error':'Erreur '+ err.errmsg});
					} else {
						console.log('Success: ' + JSON.stringify(result) +' '+parcours._id);
						res.json({id: parcours._id});//send(parcours._id)
					}
				});
			});
		}
	},

	/* Mise à jour des données */
	update : function(req, res) {
		var id = req.params.id;
		var parcours = req.body;
		console.log(req.body);
		console.log('Updating parcours: ' + id);
		console.log(JSON.stringify(parcours));
		delete parcours._id;
		db.collection('parcours', function(err, collection) {
		   collection.update({'_id':new mongo.ObjectID(id)}, {$set:{"nom":"tset"}}, {}, function(err, result) {
		  //  collection.findAndModify({'_id':new mongo.ObjectID(id)},[],parcours,{upsert: true}, function(err, result) {
				if (err) {
					console.log('Error updating parcours: ' + err);
					res.send({'error':'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) updated');
					res.send(parcours);
				}
			});
		});
	},

	/* Supprime une donnée */
	delete : function(req, res) {
		var id = req.params.id;
		console.log('Deleting parcours: ' + id);
		db.collection('parcours', function(err, collection) {
			collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
				if (err) {
					res.send({'error':'An error has occurred - ' + err});
				} else {
					console.log('' + result + ' document(s) deleted');
					res.send(req.body);
				}
			});
		});
	}
}
/* Remplir la BD au démarrage de l'app si aucune données */
var populateDB = function() {

    var parcours = [
    {
        nom: "parcours1",
        x:'50',
	    y:'20'
    },
    {
        nom: "parcours2",
        x:'50',
	    y:'-20'
    }];

    db.collection('parcours', function(err, collection) {
        collection.insert(parcours, {safe:true}, function(err, result) {});
    });

};
