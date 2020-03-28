class Money extends Component {
    constructor(src, posX, posY, value) {
        super(src, posX, posY);
        this.value = value;
    }

    addMoney(n) {
        this.value+=n;
        return this.value;
    }
}

