const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


mongoose.connect('mongodb+srv://NawfAbdullah:SBbUhLVBnwo7zK3F@cluster0.t99us.mongodb.net/AllInOne?retryWrites=true&w=majority')

nutritionSchema = new mongoose.Schema({
    "carbohydrates": Number,
    "protein": Number,
    "fat": Number,
    "calories": Number,
    "sugar": Number
})

fruitsSchema = new mongoose.Schema({
    "genus": String,
    "name": String,
    "id": {type:Number},
    "family": String,
    "order": String,
    "nutritions":nutritionSchema,
    "category":String
})

const Fruit = mongoose.model("Fruit",fruitsSchema);

app.get('/fruit/',(req,res)=>{
        Fruit.find(function(err,fruits){
        if (err) {
            res.send({err:err})
        } else {
            res.send(fruits);
            }
        })
    })

app.get('/fruit/genus/:genus',(req,res)=>{
    const requestedGenus = req.params.genus;
    Fruit.find({'genus':requestedGenus.charAt(0).toUpperCase() + requestedGenus.slice(1)},(err,fruitGene)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(fruitGene)
        }
    })
})


app.get('/fruit/family/:family',(req,res)=>{
    const requestedfamily = req.params.family;
    Fruit.find({'family':requestedfamily.charAt(0).toUpperCase() + requestedfamily.slice(1)},(err,fruitGene)=>{
        if(err){
            console.log(err)
        }else{
            res.send(fruitGene)
        }
    })
})

app.get('/fruit/name/:name',(req,res)=>{
    const requestedname = req.params.name;
    Fruit.find({'name':requestedname.charAt(0).toUpperCase() + requestedname.slice(1)},(err,fruitGene)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(fruitGene)
        }
    })
})


app.get('/fruit/order/:order',(req,res)=>{
    const requestedorder = req.params.order;
    Fruit.find({'order':requestedorder.charAt(0).toUpperCase() + requestedorder.slice(1)},(err,fruitGene)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(fruitGene)
        }
    })
});

app.get('/fruit/category/:category',(req,res)=>{
    const requestedcategory = req.params.category;
    Fruit.find({'category':requestedcategory.charAt(0).toUpperCase() + requestedcategory.slice(1)},(err,fruitGene)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(fruitGene)
        }
    })
});

app.get('/fruit/object/:id',(req,res)=>{
    Fruit.findById(req.params.id,(err,fruit)=>{
        if(err){
            res.send({err:err})
        }else if(fruit && !err){
            console.log(fruit)
            res.send(fruit)
        }else{
            res.send({werning:'No data exist'})
        }
    })
});

app.post('/fruit/new',(req,res)=>{
    const apiKey = req.query.apiKey;
    if(apiKey == 'codepannustudent'){
            b = req.body
            fruit = new Fruit({
               "genus": b.genus,
                "name": b.name,
                "id": b.id,
                "family": b.family,
                "order": b.order,
                "nutritions":{
                    "carbohydrates": b.carbohydrates,
                    "protein": b.protein,
                    "fat": b.fat,
                    "calories": b.calories,
                    "sugar": b.sugar
            },
                "category":b.category
            })
            Fruit.exists({'name':b.name}, function (err, doc) {
            if (err){
                console.log(err)
            }else{
                if(doc){
                    res.send({'message':'already exists','result':{_id:doc._id}})
                }else{
                    fruit.save()
                    res.send({data:'success fully added','result':{_id:fruit._id}})
                    }
                }
            });
       
    }else{
        res.send({response:'invalid api key'})
    }
    })

app.delete('/fruit/:id',(req,res)=>{
    apiKey = req.query.apiKey
    if(apiKey == 'codepannustudent'){
        Fruit.deleteOne({ _id: req.params.id },(err,result)=>{
            if(err){
                console.log(err)
                res.send({err:err})
              
            }else{
                 console.log(result)
                res.send({message:'Sucessfully Deleted'})
            }
        })
        
    }else{
        res.send({message:'Invalid Api key'})
    }
})


/*****************************Quotes********************************/

quotesSchema = new mongoose.Schema({
    'quote':String,
    'category':String,
    'author':String
})

const Quote = mongoose.model("Quote",quotesSchema);
app.get('/quotes/',(req,res)=>{
    Quote.find(function(err,quotes){
        if (err) {
            console.log(err);
        } else {
            res.send(quotes);
            }
        })
})

app.post('/quotes/',(req,res)=>{
    const apiKey = req.query.apiKey;
    if(apiKey == 'codepannustudent'){
            b = req.body
            quote = new Quote({
                'quote':b.quote,
                'author':b.author,
                "category":b.category
            })
            Quote.exists({'quote':b.quote}, function (err, doc) {
            if (err){
                console.log(err)
            }else{
                if(doc){
                    res.send({'message':'already exists','result':{_id:doc._id}})
                }else{
                    quote.save()
                    res.send({data:'success fully added','result':{_id:quote._id}})
                    }
                }
            });
       
    }else{
        res.send({response:'invalid api key'})
    }
    })

app.get('/quotes/category/:category',(req,res)=>{
    const requestedcategory = req.params.category;
    Quote.find({'category':requestedcategory.charAt(0).toUpperCase() + requestedcategory.slice(1)},(err,quote)=>{
        if(err){
            console.log(err)
        }else{
            res.send(quote)
        }
    })
});

app.get('/quotes/random',(req,res)=>{

    Quote.find(function(err,quotes){
        if (err) {
            console.log(err);
        } else {
            random_id = Math.floor((Math.random()*quotes.length))+1;
            console.log(random_id)
            res.send({'data':quotes[random_id]})
            }
        })
})

app.get('/quotes/author/:author',(req,res)=>{
    const requestedauthor = req.params.author;
    Quote.find({'author':requestedauthor.charAt(0).toUpperCase() + requestedauthor.slice(1)},(err,quote)=>{
        if(err){
            console.log(err)
        }else{
            res.send(quote)
        }
    })
});

app.get('/quotes/author-one/:author',(req,res)=>{
    const requestedauthor = req.params.author;
    Quote.find({'author':requestedauthor.charAt(0).toUpperCase() + requestedauthor.slice(1)},(err,quote)=>{
        if(err){
            console.log(err)
        }else{
            random_id = Math.floor((Math.random()*quote.length));
            console.log(random_id)
            res.send({'data':quote[random_id]})
        }
    })
});

app.get('/quotes/category-one/:category',(req,res)=>{
    const requestedcategory = req.params.category;
    Quote.find({'category':requestedcategory.charAt(0).toUpperCase() + requestedcategory.slice(1)},(err,quote)=>{
        if(err){
            console.log(err)
        }else{
            random_id = Math.floor((Math.random()*quote.length));
            console.log(random_id)
            res.send({'data':quote[random_id]})
        }
    })
});


app.delete('/quotes/:id',(req,res)=>{
    apiKey = req.query.apiKey
    if(apiKey == 'codepannustudent'){
        Quote.deleteOne({ _id: req.params.id },(err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
              
            }else{
                 console.log(result)
                res.send({message:'Sucessfully Deleted'})
            }
        })
        
    }else{
        res.send({message:'Invalid Api key'})
    }
})


/*****************************Emotions*************************/

emojiSchema = new mongoose.Schema({
  'img':String,
  'emotion':String
})

const Emoji = mongoose.model("emoji",emojiSchema);

app.get('emoji/:emotion',(req,res)=>{
  const requestedemotion = req.params.emotion;
    Emoji.find({'emotion':requestedemotion.toLowerCase()},(err,emoji)=>{
        if(err){
            console.log(err)
        }else{
            res.send(emoji[Math.floor(Math.random()*emoji.length)])
        }
    })
})

app.post('emoji/:emotion',(req,res)=>{
   const apiKey = req.query.apiKey;
    if(apiKey == 'codepannustudent'){
            b = req.body
            emoji = new Emoji({
              'img':b.img,
              'emotion':req.params.emotion.toLowerCase(),
            })
            Emoji.exists({'img':b.img}, function (err, doc) {
            if (err){
                console.log(err)
            }else{
                if(doc){
                    res.send({'message':'already exists','result':{_id:doc._id}})
                }else{
                    emoji.save()
                    res.send({data:'success fully added','result':{_id:emoji._id}})
                    }
                }
            });
       
    }else{
        res.send({response:'invalid api key'})
    }
})


app.delete('emoji/:id',(req,res)=>{
    apiKey = req.query.apiKey
    if(apiKey == 'codepannustudent'){
        Emoji.deleteOne({ _id: req.params.id },(err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
              
            }else{
                 console.log(result)
                res.send({message:'Sucessfully Deleted'})
            }
        })
        
    }else{
        res.send({message:'Invalid Api key'})
    }
})

/******************************** Disney ********************************/


characterSchema = new mongoose.Schema({
  'name':String,
  'designedby':String,
  'img':String,
  'firstAppeared':String,
  'gender':String
})

const Character = mongoose.model("Character",characterSchema);



app.get('/disney/',(req,res)=>{
  Character.find(function(err,character){
        if (err) {
            console.log(err);
        } else {
            res.send(character);
            }
        })
    })

app.post('/disney/',(req,res)=>{
  const apiKey = req.query.apiKey;
    if(apiKey == 'codepannustudent'){
            b = req.body
            character = new Character({
              'name':b.name.toLowerCase(),
              'designedby':b.designedby.toLowerCase(),
              'img':b.img,
              'firstAppeared': b.firstAppeared.toLowerCase(),
              'gender':b.gender.toLowerCase()
            })
  
            Character.exists({'name':b.name.toLowerCase()}, function (err, doc) {
            if (err){
                console.log(err)
            }else{
                if(doc){
                    res.send({'message':'already exists','result':{_id:doc._id}})
                }else{
                    character.save()
                    res.send({data:'success fully added','result':{_id:character._id}})
                    }
                }
            });
       
    }else{
        res.send({response:'invalid api key'})
    }
    })

app.delete('/disney/:id',(req,res)=>{
    apiKey = req.query.apiKey
    if(apiKey == 'codepannustudent'){
        Character.deleteOne({ _id: req.params.id },(err,result)=>{
            if(err){
                console.log(err)
                res.send(err)
              
            }else{
                 console.log(result)
                res.send({message:'Sucessfully Deleted'})
            }
        })
        
    }else{
        res.send({message:'Invalid Api key'})
    }
})

app.get('/disney/name/:name',(req,res)=>{
    const requestedname = req.params.name;
    Character.find({'name':requestedname.toLowerCase()},(err,fruitGene)=>{
        if(err){
            console.log(err)
        }else{
            res.send(fruitGene)
        }
    })
})

app.get('/disney/gender/:gender',(req,res)=>{
    const requestedgender = req.params.gender;
    Character.find({'gender':requestedgender.toLowerCase()},(err,gender)=>{
        if(err){
            console.log(err)
        }else{
            res.send(gender)
        }
    })
})


app.listen(PORT,()=>{
  console.log('server started at port',PORT)
})
