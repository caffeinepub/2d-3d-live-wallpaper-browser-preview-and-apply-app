import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WallpaperMeta {
    id: string;
    title: string;
    thumbnail: string;
    preview: string;
    wType: WallpaperType;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WallpaperType {
    live = "live",
    twoD = "twoD",
    threeD = "threeD"
}
export interface backendInterface {
    addFavorite(wallpaperId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getFavorites(): Promise<Array<string>>;
    getWallpaperCatalog(): Promise<Array<WallpaperMeta>>;
    isCallerAdmin(): Promise<boolean>;
    isFavorite(wallpaperId: string): Promise<boolean>;
    removeFavorite(wallpaperId: string): Promise<void>;
}
