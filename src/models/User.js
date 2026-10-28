import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['user','admin', 'superadmin'],
            default:'user'
        },
        emailVerified:{
            type:Boolean,
            default:false
        },
        verificationCode:{
            type:String
        },
        verificationCodeExpires:{
            type:Date
        }
    },
    {
        timestamps:true
    }
)
//hasheo de contraseña
UserSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

//generar codigo de verificacion
UserSchema.methods.generateVerificationCode = function() {
    //codigo de 6 digitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCode = code;
    this.verificationCodeExpires = Date.now() + 15*60*1000; //15 min
    return code;
}
//porque no usamos funciones de flecha? porque necesitamos el contexto de this, que hace referencia al usuario que se esta creando

export default model('User', UserSchema);