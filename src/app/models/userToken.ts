export class UserToken {
    idUser:number;
    idRol: number;
    errorCode: string;
    message:string;

    constructor(idUser:number,idRol:number, errorCode:string,message:string) {
        this.idUser = idUser;
        this.idRol = idRol;
        this.errorCode = errorCode;
        this.message = message;
    }

    changeUser(idUser:number,idRol:number, errorCode:string,message:string):void{
        this.idUser = idUser;
        this.idRol = idRol;
        this.errorCode = errorCode;
        this.message = message;
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
}