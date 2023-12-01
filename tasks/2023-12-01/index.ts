interface IChild {
  id: number;
  list: string[];
}

export class GiftRegistry {
  private database: IChild[] = [];

  addGift(id: number, name: string) {
    const child = this.database.find((item) => item.id === id);
    !!child
      ? child.list.push(name)
      : this.database.push({
          id,
          list: [name],
        });
  }

  removeGift(id: number, name: string) {
    const child = this.database.find((item) => item.id === id);
    if (!!!child) return;

    const giftPosition = child.list.indexOf(name);
    if (giftPosition === -1) throw "Gift not found";

    child.list.splice(giftPosition, giftPosition + 1);
  }

  getGiftsForChild(id: number) {
    return this.database.find((item) => item.id === id)?.list;
  }
}
