import { DataTypes, Model } from 'sequelize';
import db from '../db';
import User from './User';

class Note extends Model {
    public id!: number;
    public userId!: number;
}

Note.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'note',
        tableName: 'notes',
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
);

Note.belongsTo(User, { targetKey: 'id' })

export default Note;
