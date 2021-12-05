export class Nutriologo {
    constructor(
        public _id: string,
      public token: string,
      public nombre: string,
      public genero: string,
      public encryptedPassword: string,
      public email: string,
      public edad: number,
      public dietas: any,
      public clientes: any,
    ){}
}