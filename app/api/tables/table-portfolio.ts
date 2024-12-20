import { DataTypes, Model } from 'sequelize';
import Database from '../config/database';

const database = new Database();
const sequelize = database.sequelize!;

class Portfolio extends Model {
    public pid!: string;
    public id!: string;
    public image!: Buffer;
    public likeCount!: number;
    public tags!: string[];
    public replies!: string[][];
}

Portfolio.init(
    {
        pid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        likeCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        replies: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: 'portfolio',
    }
);

export default Portfolio;