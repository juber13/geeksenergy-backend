import { User } from "../models/user.model.js";

export const userRegister = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email , phone , password , profession} = req.body;


    if ([name, email, phone , password , profession ].some((field) => !field)) {

       return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }


    const newUser = await User.create({name, email, phone , password , profession});

    return res.status(201).json({
      message: "User registerd Successfully",
      success: true,
      newUser,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({
          message: "All fields are required",
          success: false,
        });
      }

      const user = await User.findOne({ email });

      if(!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if(!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password or email",
          success: false,
        });
      }

      const token = await user.generateToken();
      
      return res.status(200).json({
        message: "Login successfully",
        success: true,
        user,
        token,
      }); 

    }catch(err){
     console.log(err);
     return res.status(500).json({
      message: "Internal server error",
      success: false,
     }); 
  }
}


export const getAllRegisterUser = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
      const formattedUsers = users.map((user) => ({
        id: user.id, // Adjust according to your user model attributes
        name: user.name, // Example field
        email: user.email, // Example field
        phone: user.phone, // Example field
        profession: user.profession, // Example field
        // Add other fields as necessary
      }));
    // console.log(users);
    return res.status(200).json({
      message: 'Users fetched successfully',
      success: true,
      formattedUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      message: 'Failed to fetch users',
      success: false,
      error: error.message,
    });
  }
};


export const updateUserInfo = async (req, res) => {
  const { name , phone } = req.body;
  console.log(name, phone);
  console.log(req.query.id); 
  
  const user = await User.findByIdAndUpdate(req.query.id, 
    {
      $set: {
        name,
        phone,
      },
    },
    { new: true }
  )

  console.log(user);

  return res
    .status(200)
    .json({
      message: "User updated successfully",
      success: true,
      user,
    });
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
      user,
    }); 
  }catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

