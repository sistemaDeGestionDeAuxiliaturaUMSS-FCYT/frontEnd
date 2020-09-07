export class User {
    idUser:number;
    idRol:number;
    errorCode:string;
    message:string;
    token:string;
    login:boolean;

    constructor(idUser:number,idRol:number, errorCode:string,message:string,token:string,login:boolean) {
        this.idUser = idUser;
        this.idRol = idRol;
        this.errorCode = errorCode;
        this.message = message;
        this.token = token;
        this.login = login;
    }

    changeUser(idUser:number,idRol:number, errorCode:string,message:string,token:string,login:boolean):void{
        this.idUser = idUser;
        this.idRol = idRol;
        this.errorCode = errorCode;
        this.message = message;
        this.token = token;
        this.login = login;
    }

    getIdUser():number{
        return this.idUser;
    }

    getIdRol():number{
        return this.idRol;
    }

    getErrorCode():string{
        return this.errorCode;
    }

    getMessage():string{
        return this.message;
    }

    getToken():string{
        return this.token;
    }

    getLogin():boolean{
        return this.login;
    }
}