import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import User from './model/userModel.js';
import UserLogin from './model/userLoginModel.js';
import userLogindata from './userLogindata.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect( process.env.MONGODB_URI ||'mongodb+srv://TaiNguyen:tailacuachi123@cluster0.vnlzl.mongodb.net/test',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

///serve static file assets if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


app.get('/',(req, res)=>{
    res.send('server is ready');
});
app.get('/abc',(req, res)=>{
    res.send("abc test");
});

app.get('/hellotest', async(req, res) =>{   
    const userCreated = await User.insertMany(data); 
    res.send(userCreated); 
})
app.get('/adduserlogin', async(req, res) =>{   
    const userLoginCreated = await UserLogin.insertMany(userLogindata); 
    res.send(userLoginCreated); 
})
app.get('/adduserloginshow', async(req, res) =>{   
    const userCreated = await UserLogin.find(); 
    res.send(userCreated); 
})
app.post('/hello', async(req, res) =>{   
  const userCreated = await User.find({ chatId: req.body.userId }); 
  res.send(userCreated); 
})
app.get('/messageInfo/:id', async(req, res) =>{   
  const message = await User.findById(req.params.id);
  if (message) {
    res.send(message);
  } else {
    res.status(404).send({ message: 'Message Not Found' });
  }
}
);
app.put('/userupdate/:id',async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.noteTitle = req.body.notetitle;
      user.message = req.body.message ;
      user.startDate = req.body.startDate;
      user.endDate = req.body.endDate;
      user.autoDelete = req.body.radiobutton;
      const updatedMessageUser = await user.save();
      res.send({ message: 'Items Updated', user: updatedMessageUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  }
);
app.post('/create', (async(req,res)=>{
    const user = new User({
        noteTitle: req.body.notetitle,
        message: req.body.message,
        chatId: req.body.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        autoDelete: req.body.radiobutton,
    });
    const createUser = await user.save();
    res.send("create user success");
})
);
app.delete('/delete/:id',  async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deleteProduct = await User.remove(user);
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })

app.post(
    '/signin',
     async (req, res) => {
      const user = await UserLogin.findOne({ email: req.body.email });
      if (user){
        const check = (user.password === req.body.password);
        check ? 
          res.send({
            email: user.email,
            userId: user._id
          })
          : res.status(401).send({ message: 'password not match' });
      }
      res.status(401).send({ message: 'Invalid email or password' });
    }
);
app.post(
  '/register',
  async (req, res) => {
    const userRegister = new UserLogin({
      email: req.body.email,
      password: req.body.password,
      
    });
    const createdUser = await userRegister.save();
    res.send({
      email: createdUser.email,
      password: createdUser.password,
    });
  }
);
  

app.listen(process.env.PORT || 4000, () =>{
    console.log('server is running');
});