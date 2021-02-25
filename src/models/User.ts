import { Association, Model } from 'sequelize';
import { DataTypes } from 'sequelize';
import { hash, compare } from 'bcrypt';
import db from '../db';
import Note from './Note';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public fullname!: string;

    public readonly notes?: Note[];

    public static associations: {
        notes: Association<User, Note>;
    }

    async comparePasswords(password: string) {
        return await compare(password, this.password!);
    }
}

User.init(
    {
        id: {
            type: '',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        modelName: 'user',
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password.toString(), 10); // toString() - strange things may happen =)

                if (!user.fullname || user.fullname.trim().length === 0) {
                    user.fullname = user.username;
                }
            },
        },
        timestamps: false,
        sequelize: db,
    }
);

// User.hasMany(Note, { sourceKey: 'id', foreignKey: 'userId', as: 'notes' });

export default User;
