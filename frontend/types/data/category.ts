import { User } from "./user";

export enum CategoryTypes {
    BaseCategory = 0,
    SubCategory,
}

export interface Category {
    categoryId: string;
    name: string;
    description: string;
    categoryType: CategoryTypes;
    mainCategoryId: string;
    mainCategory: Category;
    subCategories: Category[];
    followers: User[];
}
