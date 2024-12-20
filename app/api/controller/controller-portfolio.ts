import { Request, Response} from 'express';
import * as service from '../service/service-portfolio';

export const createPortfolio = async (req: Request, res: Response) => {
    try {
        const { id, image, tags } = req.body;
        const newPortfolio = await service.createPortfolio(id, image, tags);
        res.status(200).json(newPortfolio);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create portfolio' });
      }
}

export const updatePortfolio = async (req: Request, res: Response) => {
  try {
      const { pid, image, likeCount, tags, replies } = req.body;
      const updatedPortfolio = await service.updatePortfolio(pid, image, likeCount, tags, replies);
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update portfolio' });
    }
}

export const findPortfolioByPortfolioId = async (req: Request, res: Response) => {
  try {
      const { pid } = req.body;
      const foundPortfolio = await service.findPortfolioByPortfolioId(pid);
      res.status(200).json(foundPortfolio);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
}

export const findPortfolioByUserId = async (req: Request, res: Response) => {
  try {
      const { id } = req.body;
      const foundPortfolios = await service.findPortfolioByUserId(id);
      res.status(200).json(foundPortfolios);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
}

export const findPortfoliosByTags = async (req: Request, res: Response) => {
  try {
      const { tags } = req.body;
      const foundPortfolios = await service.findPortfoliosByTags(tags);
      res.status(200).json(foundPortfolios);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
}