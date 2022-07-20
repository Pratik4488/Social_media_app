const router= require("express").Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

// Update User
    router.put('/:id', async (req, res) =>{
        if(req.body.userId == req.params.id || req.body.isAdmin){
            if(req.body.password){
                try{
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }catch(error){
                    return res.status(500).json(error);
                }
            }

            try{
                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                });
                res.status(200).json("Account has been updated!!!")
            }catch(error){
                res.status(500).json(error);
            }
        }else{
            return res.status(404).json("You can update only your account!")
        }
    })





// Delete User

router.delete('/:id', async (req, res) =>{
    if(req.body.userId == req.params.id || req.body.isAdmin){

        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been Deleted!!!")
        }catch(error){
            res.status(500).json(error);
        }
    }else{
        return res.status(404).json("You can delete only your account!")
    }
})

// Get a User

router.get("/", async (req, res) =>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user =userId
         ? await User.findById(req.query.userId)
        : await User.findOne({username: username});

        // This is how we can filter data to be viwed form mongodb document.
        const {password, updatedAt, createdAt, isAdmin, ...other}= user._doc;
        res.status(200).json(other);

    }catch(error){
        res.status(500).json(error)
    }
})



// get all the followings

router.get("/friends/:userId", async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId =>{
                return User.findById(friendId)
            })
        )

        let friendList = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    }catch(error){
        res.status(500).json(error);
    }
})


// get all the followers

router.get("/followers/:userId", async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followers.map(friendId =>{
                return User.findById(friendId)
            })
        )

        let friendList = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    }catch(error){
        res.status(500).json(error);
    }
})


// Follow a User

router.put("/:id/follow", async( req, res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);
            if(!user.followers.includes(currentUser.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: user._id}});
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("You already follow this user");
            }
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(500).json("You can not follow yourself.")
    }
} )




// unfollow a User

router.put("/:id/unfollow", async( req, res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.body.userId}});
                res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json("You don't follow this user");
            }
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(500).json("You can not follow yourself.")
    }
} )

router.get('/', (req,res) =>{
    res.send("hey its user route")
})
module.exports= router;