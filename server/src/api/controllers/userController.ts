import { Request, Response } from "express";
import User, {IUser} from '../../models/Users';
import jwt from 'jsonwebtoken';
import { channel } from "diagnostics_channel";
import { availableMemory } from "process";
import { create } from "domain";

//Generating JWT 
const generateToken = (id: string ) : string => {
  return jwt.sign({id}, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '30d'
  });
};


// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const {username, email, password} = req.body;

  try{
    //Check exist user
    const userExist = await User.findOne({$or: [{email}, {username} ]});

    if (userExist) {
      res.status(400).json({message: 'User already exist'});
      return;
    }

    //Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id ,
        username: user.username,
        email: user.email,
        chips: user.chips,
        avatar: user.avatar,
        statistics: user.statistics,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(400).json({message: 'invalid user'})
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({message: 'server error'});
  }
};




// @desc Auth user & get token
// @route POST /api/users/login 
// @access Public 

export const loginUser = async(req: Request, res: Response) : Promise<void> => {
  const {email, password} = req.body;

  try {
    //checking email user
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
      
      //update waktu login
      user.lastLogin = new Date();
      await user.save();

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        chips: user.chips,
        avatar: user.avatar,
        statistics: user.statistics,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(401).json({message: 'Invalid email or password'});
    }

  }catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

// @desc Get user profile
// @route Get /api/users/profile
// @access Private 

export const getUserProfile = async (req: Request, res : Response) : Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        chips: user.chips,
        avatar: user.avatar,
        statistics: user.statistics,
        createdAt : user.createdAt,
        lastLogin: user.lastLogin
      });
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  } 
}