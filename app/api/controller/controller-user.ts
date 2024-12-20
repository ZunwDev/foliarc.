import { Request, Response} from 'express';
import * as service from '../service/service-user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, username, login, email, location, tags } = req.body;
        const newUser = await service.createUser(id, username, login, email, location, tags);
        res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
      const { id, username, name, email, location, tags, interactions } = req.body;
      const updatedUser = await service.updateUser(id, username, name, email, location, tags, interactions);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
}

export const findUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const foundUser = await service.findUserById(id);
        res.status(200).json(foundUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
}

export const findUsersByUsername = async (req: Request, res: Response) => {
  try {
      const { username } = req.body;
      const foundUsers = await service.findUsersByUsername(username);
      res.status(200).json(foundUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export const findUsersByEmail = async (req: Request, res: Response) => {
  try {
      const { email } = req.body;
      const foundUsers = await service.findUsersByEmail(email);
      res.status(200).json(foundUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export const findUsersByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const foundUsers = await service.findUsersByName(name);
        res.status(200).json(foundUsers);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
}