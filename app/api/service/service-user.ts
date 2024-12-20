import User from "../tables/table-user";

export const createUser = async (
  id: string,
  username: string,
  name: string | null,
  email: string | null,
  location: string | null,
  tags: string[] | null
) => {
  return await User.create({ id, username, name, email, location, tags });
};

export const updateUser = async (
  id: string,
  username: string,
  name: string | null,
  email: string | null,
  location: string | null,
  tags: string[] | null,
  interactions: string[][] | null
) => {
  return await User.update({ username, name, email, location, tags, interactions }, { where: { id } });
};

export const findUserById = async (id: string) => {
  return await User.findByPk(id);
};

export const findUsersByUsername = async (username: string) => {
  return await User.findAll({
    where: { username },
  });
};

export const findUsersByEmail = async (email: string) => {
  return await User.findAll({
    where: { email },
  });
};

export const findUsersByName = async (name: string) => {
  return await User.findAll({
    where: { name },
  });
};
