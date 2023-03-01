const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            lowercase: true
        }
    },
    {
        timestamps: true,
    }
)


//Mã hóa password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('User', userSchema);

module.exports = User;
