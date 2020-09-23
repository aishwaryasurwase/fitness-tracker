export interface Exercise {
    id: string,
    name: string,
    duration: number,
    calories: number,
    date?: Date,
    status?: 'Completed' | 'Cancelled' | null
}