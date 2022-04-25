const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app = express();

app.use(express.static("public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


mongoose.connect('mongodb+srv://NawfAbdullah:SBbUhLVBnwo7zK3F@cluster0.t99us.mongodb.net/EmotionApi?retryWrites=true&w=majority')

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

app.listen(3000,()=>{
  console.log('server is running on port 3000')
})