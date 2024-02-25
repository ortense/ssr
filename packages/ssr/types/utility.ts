export type Nullable<T> = T | null
export type Undefinable<T> = T | undefined

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K]
}
