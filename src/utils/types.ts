export interface Building {
    id: number,
    name: string,
    status: number,
    location: string,
    open_hours: string,
    close_hours: string,
    image: string
}
export interface User {
    id: number,
    name: string,
    email: string
}

export interface Permit {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    passege_date: string,
    person_count: number
}

export interface Option {
    id: number,
    name: string
}