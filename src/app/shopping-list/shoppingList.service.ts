import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
      startedEditing = new Subject<number>();
}
