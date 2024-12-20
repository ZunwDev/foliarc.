import { Op } from "sequelize";
import Portfolio from "../tables/table-portfolio";

export const createPortfolio = async (id: string, image: Buffer, tags: string[] | null) => {
  return await Portfolio.create({ id, image, tags });
};

export const updatePortfolio = async (
  pid: string,
  image: Buffer,
  likeCount: number,
  tags: string[] | null,
  replies: string[][]
) => {
  return await Portfolio.update({ image, likeCount, tags, replies }, { where: { pid } });
};

export const findPortfolioByPortfolioId = async (pid: string) => {
  return await Portfolio.findByPk(pid);
};

export const findPortfolioByUserId = async (id: string) => {
  return await Portfolio.findAll({
    where: { id },
  });
};

export const findPortfoliosByTags = async (tags: string[]) => {
  return await Portfolio.findAll({
    where: {
      tags: { [Op.contains]: tags },
    },
  });
};
