import {Request, Response, NextFunction} from 'express';
import {User} from '../models';
import auth from '../authService';
import { register, get_user } from '../db';


// Extend Express Request to include `user` property
interface AuthenticatedRequest extends Request {
  user?: any;
}

//function to add new users
async function add_user(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Bad request: No user information found in body', data: {} });
      return;
    } else {
      const hashedPassword = await auth.hash_password(password);
      const new_user: User | undefined = await register(username, hashedPassword);
      if(new_user){
        const access_token = await auth.generate_access_token(new_user.username);
        const refresh_token = await auth.generate_refresh_token(new_user.username);

        // Set the refresh token in a secure cookie
         res.cookie('refreshToken', refresh_token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production', // Set to true in production
             sameSite: 'strict',
             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
         });

        //send the access token to the client directly
        res.status(200).json({ message: 'User registered successfully', data:
        { id: new_user.id,  username: new_user.username, token: access_token} });
      }else{
        res.status(400).json({ message: 'user already exists', data: { usermame: null} });
      }
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', data: error });
    return;
  }
}

//controller function to log user in
async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Bad request: No user information found in body', data: {} });
      return;
    } else {
      const user: User | undefined = await get_user(username);
      if(user){
        if(await auth.check_pass(password, user.password)){
          const access_token = await auth.generate_access_token(user.username);
          const refresh_token = await auth.generate_refresh_token(user.username);

          // Set the refresh token in a secure cookie
           res.cookie('refreshToken', refresh_token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production', // Set to true in production
               sameSite: 'strict',
               maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
           });

          //send the access token to the client directly
          res.status(200).json({ message: 'User registered successfully', data:
          { id: user.id, username: user.username, token: access_token} });
        }else{
          res.status(400).json({ message: 'wrong username or password', data: { username: null} });
        }
      }else{
        res.status(400).json({ message: 'no such user', data: { username: null} });
      }
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', data: error });
    return;
  }
}


//controller function to logoout
async function logout(_req: Request, res: Response) :Promise<void>{
  try {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during logout', error: error });
  }
}

//controller to get new access token after old expired
async function refresh_token(req: Request, res: Response) :Promise<void> {
  const token = req.cookies.refreshToken;

  if(token){
    try {
      const verified = await auth.verify_refresh_token(token);

      if(verified){
        //send the access token to the client directly
        const access_token = await auth.generate_access_token(verified.username);
        res.status(200).json({ message: 'token refreshed successfully', data:
        { id: verified.id, username: verified.username, token: access_token} });
      }else{
        res.status(400).json({message: 'invalid token'});
      }

    } catch (error) {
      res.status(400).json({message: 'could not verify token'});
    }
  }
    else{
      res.status(400).json({message: 'no token in cookies'});
    }

  }

async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if(token){
    const verified = await auth.verify_access_token(token);
    if(verified){
      req.user = verified;
      next();
    }else{
      res.status(400).json({message: 'invalid token'})
    }
  }else{
    res.status(401).json({message: 'no token found'});
  }
}


    //export all functions to be used throughout the file
    export default{
      add_user,
      login,
      logout,
      refresh_token,
      authenticate,
    };
