var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('parcours', server);

/* Lancer au démarrage de l'application */
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'parcours' database");
        db.collection('point', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'parcours' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

/* Retourne un objet */
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving point: ' + id);
    db.collection('point', function(err, collection) {
		console.log(id);
		collection.find({'_id':new mongo.ObjectID(id)}).limit(1).next(
		function(err, item){
            res.send(item);
        });
    });
};

/* Retourne tous les objets */
exports.findAll = function(req, res) {
    db.collection('point', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/* Ajoute une donnée */
exports.add = function(req, res) {
    var point = req.body;
    console.log('Adding point: ' + JSON.stringify(point));
    db.collection('point', function(err, collection) {
        collection.insert(point, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

/* Mise à jour des données */
exports.update = function(req, res) {
    var id = req.params.id;
    var point = req.body;
    console.log('Updating point: ' + id);
    console.log(JSON.stringify(point));
    db.collection('parcours', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, point, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating point: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(point);
            }
        });
    });
}

/* Supprime une donnée */
exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting point: ' + id);
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

/* Remplir la BD au démarrage de l'app si aucune données */
var populateDB = function() {

    var point = [
    {
        nom: "point1",
        x:'50',
	    y:'20'
    },
    {
        nom: "point2",
        x:'50',
	    y:'-20'
    }];

    db.collection('point', function(err, collection) {
        collection.insert(point, {safe:true}, function(err, result) {});
    });

};
