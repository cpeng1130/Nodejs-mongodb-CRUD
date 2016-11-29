/**
 * Created by Peng on 2016-11-27.
 */
var mongoClient=require("mongodb").MongoClient;
var setting=require("../settings.js");
function _connectDB(callback){
    var url=setting.dburl;
    mongoClient.connect(url,function(err,db){
       callback(err,db);
    });
}

exports.insertOne=function(collectionName,json,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,null);
            db.close();
            return;
        }
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
            db.close();
        })
    })

};

exports.find=function(collectionName,json,callback){
    var result=[];
    if(arguments.length!=3){
        callback("find get 3 paramters");
        db.close();
        return;
    }
    _connectDB(function (err,db) {
        var cursor=db.collection(collectionName).find(json);
        cursor.each(function (err,doc) {
            if(err){
                callback(err,null);
                db.close();
            }

                if(doc!=null){
                    result.push(doc);
                }
                else{
                    callback(null,result);
                    db.close();
                }

        })
    });
};

//exports.newFind=function (collectionName,json,args,callback)
exports.newFind=function (collectionName,json,C,D) {
    var result =[];
    var skipnumber=0;
    var limitnumber=0;
    var args;
    var callback;
    if(arguments.length==3){
        callback=C;
    }
    else if(arguments.length==4){
        args=C;
        callback=D;
        skipnumber= args.pageamount*args.page;
        limitnumber= args.pageamount;
        console.log(skipnumber,limitnumber);
        _connectDB(function (err,db){
            var cursor=db.collection(collectionName).find(json).skip(10).limit(5);
            cursor.each(function (err,doc) {
                if(err){
                    db.close();
                    return callback(err,null);

                }
                if(doc!=null){
                    result.push(doc);
                }
            });
            callback(null,result);
            db.close();

        });
    }else{
       throw new Error("parameters have to be 3 or 4");
    }
};

exports.deleteMany=function(collectionName,json,callback){
    _connectionDB(function (err,db) {
        db.collection(collectionName).deleteMany(
            json,
            function(err,results){
                callback(err,results);
                db.close();
            }

        )
    })
};

exports.updateMany=function(collectionName,json1,json1,callback){
    _connectonDB(function (err,db) {
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function (err,results) {
                callback(err,results);
                db.close();
            }
        )
    })
};
