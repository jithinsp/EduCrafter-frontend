import { UserModel } from "../core/interfaces/user.model";


export const UserState: UserModel={
    list: [],
    errormessage:'',
    userObj:{
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER",
        isActive: true
    }
}