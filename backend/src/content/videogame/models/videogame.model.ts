import { Category } from 'src/category/models/category.model';
import { Content } from 'src/content/model/content.model';

export class Videogame extends Content {
  categories: Category[];
}
