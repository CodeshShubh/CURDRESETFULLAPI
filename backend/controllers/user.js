import { User } from "../models/User.js";

// addData
export const addData = async (req, res) => {
  try {
    const { name, email, age, profession } = req.body;
    const existUser = await User.find({ email });
    if (existUser) {
      res.status(400).json({
        success: false,
        Message: "User Alrady Exist",
      });
    } else {
      const user = await User.create({ name, email, age, profession });
      res.status(201).json({
        success: true,
        Message: "User Data add succesfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: "Unable to add data due to error",
      Error: error.errors ? error.errors.name.message : error.message,
    });
  }
};


// get all User
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
      res.status(200).json({
        success: true,
        Message: "All Users",
        users
      });

  } catch (error) {
    res.status(400).json({
      success: false,
      Message: "Error OR Data not Persent",
      Error: error.errors ? error.errors.name.message : error.message,
    });
  }
};


// search user
export const searchUser = async (req, res) => {
  try {
    const { email } = req.body;

     if(!email){
        res.status(400).json({success:false, Message:"plese enter email first"})
     }

      
    const user = await User.findOne({ email });
    if (user) {
      res.status(201).json({
        success: true,
        Message: "User Fetched  succesfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        Message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: "Unable to add data due to error",
      Error: error.errors ? error.errors.name.message : error.message,
    });
  }
};


// delete One User
export const removeData = async (req, res) => {
  try {
    const { email } = req.body;

     if(!email){
        res.status(400).json({success:false, Message:"plese enter email first"})
     }
      
    const user = await User.findOneAndDelete({ email });
    if (user) {
      res.status(201).json({
        success: true,
        Message: "User Deleted  succesfully",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        Message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      Message: "Unable to add data due to error",
      Error: error.errors ? error.errors.name.message : error.message,
    });
  }
};


// updateUser

export const updateUser = async(req,res)=>{

    try {
           const {id} = req.params;

   const {name, email, age, profession} =req.body
    let user = await User.findByIdAndUpdate(id,{name:name, email:email, age:age, profession:profession},{new:true})

    if(user){
        res.status(200).json({
            success:true,
            Message:"User update his details successfully",
            user
        })
    }else{
       res.status(404).json({
            success:flase,
            Message:"User not Found",
            user
        }) 
    }
        
    } catch (error) {
         
         res.status(500).json({
            success:false,
            Message:`server Error ${error.message}`
         })
    }

}

export const professionStats = async(req,res)=>{
     try {
         let stats = await User.aggregate([
            {
                $match:{age:{$gt:18}}
            },
            {
                $group:{
                    _id:"$profession",
                    totalUser:{$sum:1},
                    ageAvg:{$avg:"$age"}
                }
            }
         ])

         res.status(200).json({
            success:true,
            Messsage:"User grouped by Profession",
            stats
         })
        
     } catch (error) {
          res.status(500).json({
            success:true,
            Messsage:error.message,

         })
     }
}
