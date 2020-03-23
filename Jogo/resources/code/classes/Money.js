class Money extends Component {
    constructor(ctx,src, posX, posY, value) {
        super(ctx,src, posX, posY);
        this.value = value;
    }

    addMoney(n) {
        this.value+=n;
        return this.value;
    }
}

