export type CreateUserDTO = {
    name: string;
    email: string;
    address: string;
    coordinates: [number, number]
}

export type FindUserDTO = {
    _id?: string;
    name?: string;
    email?: string;
}

export type FindAllUsersDTO = {
    page: number,
    limit: number,
}