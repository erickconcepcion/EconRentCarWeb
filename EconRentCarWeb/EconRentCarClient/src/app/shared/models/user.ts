export interface IUser {
    Email: string;
    UserName: string;
    Empleado: IEmpleadoVm;
}
export interface IEmpleadoVm {
    Id: string;
    Nombres: string;
    Apellidos: string;
    CedulaEmpleado: string;
    TandaLaboral: string;
    PorcentajeComision: number;
    FechaIngreso: Date;
    Activo: boolean;
}
export enum ITandaLaboral {
    Matutino = 1,
    Vespertino,
    Nocturno
}
export interface IAuthResult {
    id: string;
    auth_token: string;
    user: IUser;
}
export interface ILogInVm {
    Email: string;
    Password: string;
}
